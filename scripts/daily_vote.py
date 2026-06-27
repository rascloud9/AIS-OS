#!/usr/bin/env python3
"""
daily_vote.py — Daily vote for Revolution Group, Columbus CEO Best of Business Awards.

Navigation path:
  1. Load referral URL (sets session context on outer page)
  2. Navigate SecondStreet frame directly to IT Company group (group=552527)
  3. Find Revolution Group VOTE button and click it
  Cookies from --setup bypass any registration form on subsequent runs.

FIRST TIME SETUP:
    python daily_vote.py --setup
    → Browser opens headed. Fill the registration form, then click Submit.
    → Cookies are saved. Future runs skip registration entirely.

DAILY USE (Task Scheduler):
    python daily_vote.py --headless

MANUAL / DEBUG:
    python daily_vote.py
"""

import sys
import logging
from pathlib import Path
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout

VOTE_URL = (
    "http://columbusceo.gannettcontests.com"
    "/2026-Columbus-CEOs-Best-of-Business-Awards"
    "/#/referrals/8dfd478e-9f4d-4b82-b802-4ad321f4ebc4"
)

# Direct embed URL for the IT Company subcategory (group=552527)
SS_IT_URL = (
    "https://embed-1168292.secondstreetapp.com"
    "/embed/5f8fbb2c-6637-4ac9-b5e1-7a596565e59d"
    "/gallery/?group=552527"
)

SCRIPTS_DIR = Path(__file__).parent
PROFILE_DIR = SCRIPTS_DIR / "chrome_profile"
LOG_FILE    = SCRIPTS_DIR / "vote_log.txt"
SS_FILE     = SCRIPTS_DIR / "vote_after_click.png"
ERR_FILE    = SCRIPTS_DIR / "vote_error.png"

PROFILE_DIR.mkdir(exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger(__name__)

HEADLESS   = "--headless" in sys.argv
SETUP_MODE = "--setup" in sys.argv

# Walk up 20 ancestor levels looking for "Revolution Group" text in siblings
FIND_ANCESTOR_JS = """
el => {
    let node = el;
    for (let i = 0; i < 20; i++) {
        node = node.parentElement;
        if (!node) break;
        const txt = node.innerText || '';
        if (txt.toLowerCase().includes('revolution group')) {
            return txt.substring(0, 150);
        }
    }
    return '';
}
"""


def get_ss_frame(page, timeout_s=20):
    for _ in range(timeout_s * 2):
        for frame in page.frames:
            if "secondstreetapp" in frame.url:
                return frame
        page.wait_for_timeout(500)
    return None


def force_click(locator):
    try:
        locator.click(force=True, timeout=8_000)
    except Exception:
        locator.evaluate("el => el.click()")


def run_vote():
    mode = "SETUP" if SETUP_MODE else ("HEADLESS" if HEADLESS else "HEADED")
    log.info(f"=== Daily vote run started ({mode}) ===")

    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(PROFILE_DIR),
            headless=HEADLESS and not SETUP_MODE,
            viewport={"width": 1280, "height": 900},
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/125.0.0.0 Safari/537.36"
            ),
        )
        page = ctx.new_page()

        try:
            # ── 1. Load the referral page (establishes context / cookies) ─────
            log.info("Loading referral URL")
            page.goto(VOTE_URL, wait_until="load", timeout=30_000)
            page.wait_for_timeout(3_000)

            # ── 2. Wait for the SecondStreet embed frame ──────────────────────
            frame = get_ss_frame(page)
            if frame is None:
                log.error("SecondStreet embed not found on referral page")
                page.screenshot(path=str(ERR_FILE), full_page=True)
                return
            log.info(f"Frame: {frame.url}")

            # ── 3. Navigate frame directly to IT Company group ────────────────
            # group=552527 = Information Technology Company subcategory.
            # Cookies from --setup handle auth — no registration form appears.
            log.info("Navigating frame to IT Company gallery (group=552527)")
            frame.goto(SS_IT_URL, wait_until="load", timeout=20_000)
            page.wait_for_timeout(3_000)

            # ── 6. Wait for VOTE buttons and find Revolution Group ────────────
            log.info("Waiting for VOTE buttons")
            try:
                frame.wait_for_selector("button.voting-button", timeout=10_000)
            except PlaywrightTimeout:
                log.warning("Timeout waiting for voting buttons")

            all_btns = frame.locator("button.voting-button").all()
            log.info(f"Voting buttons visible: {len(all_btns)}")

            vote_btn = None
            for i, btn in enumerate(all_btns):
                try:
                    ancestor = btn.evaluate(FIND_ANCESTOR_JS)
                    if ancestor:
                        log.info(f"  [{i}] '{ancestor[:80]}'")
                    if "revolution group" in ancestor.lower():
                        vote_btn = btn
                        log.info(f"  >> Revolution Group found at [{i}]")
                        break
                except Exception:
                    pass

            if vote_btn is None and len(all_btns) == 1:
                log.info("Single button present — using it")
                vote_btn = all_btns[0]

            if vote_btn is None:
                log.error("Revolution Group VOTE button not found")
                page.screenshot(path=str(ERR_FILE), full_page=True)
                return

            # ── 7. Click VOTE ─────────────────────────────────────────────────
            vote_btn.scroll_into_view_if_needed()
            vote_btn.click(timeout=10_000)
            log.info("VOTE clicked")
            page.wait_for_timeout(3_000)
            page.screenshot(path=str(SS_FILE))
            log.info(f"Screenshot saved: {SS_FILE}")

            # ── 8. Handle registration form (setup mode) ──────────────────────
            reg_form = frame.locator("input[type='email']")
            if reg_form.count() > 0:
                if SETUP_MODE:
                    # Pre-fill email so Rick just has to complete the rest
                    try:
                        email_field = frame.locator("input[type='email']").first
                        email_field.scroll_into_view_if_needed()
                        email_field.fill("rsnide@revolutiongroup.com")
                        log.info("Email pre-filled: rsnide@revolutiongroup.com")
                    except Exception:
                        pass
                    log.info("")
                    log.info("=" * 60)
                    log.info("ACTION REQUIRED IN BROWSER WINDOW:")
                    log.info("  Email is pre-filled. Fill First Name, Last Name,")
                    log.info("  State, Postal Code, Phone — then click Submit.")
                    log.info("  Waiting up to 5 minutes...")
                    log.info("=" * 60)
                    try:
                        frame.wait_for_selector(
                            "input[type='email']", state="hidden", timeout=300_000
                        )
                        log.info("Form submitted — registration complete!")
                        page.wait_for_timeout(2_000)
                        page.screenshot(path=str(SS_FILE))
                    except PlaywrightTimeout:
                        log.warning("Timed out waiting for form submission")
                else:
                    log.warning(
                        "Registration form appeared. Run --setup once to register, "
                        "then --headless works automatically."
                    )
            else:
                already = frame.locator("[class*='already-voted'], [class*='voted-message']")
                if already.count() > 0:
                    log.warning("Already voted today")
                else:
                    log.info("Vote submitted successfully")

        except PlaywrightTimeout as e:
            log.error(f"Timeout: {e}")
            try:
                page.screenshot(path=str(ERR_FILE))
            except Exception:
                pass
        except Exception as e:
            log.error(f"Unexpected error: {e}", exc_info=True)
            try:
                page.screenshot(path=str(ERR_FILE))
            except Exception:
                pass
        finally:
            if SETUP_MODE:
                log.info("Session saved to chrome_profile/. Run --headless for daily use.")
            ctx.close()

    log.info("=== Vote run complete ===\n")


if __name__ == "__main__":
    run_vote()
