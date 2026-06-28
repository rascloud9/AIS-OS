# Business Valuation Methods — Reference

> 📚 **Model-knowledge reference.** This is general understanding (concepts, typical ranges), not Revolution Group facts and not legal/tax/valuation advice. Verify specifics with GBQ / the CPA / Ice Miller before betting on them. Deal-specific numbers live in [../projects/tsd-buyout/](../projects/tsd-buyout/).

Captured once so we stop re-deriving it every time a deal comes up. Primary use today: the [TSD buyout](../projects/tsd-buyout/financials.md). The [Hallmark/HMS comparable](../projects/tsd-buyout/documents/hms-comparable-deal-2021-2022.md) is a worked real-world example of most of these in action.

## The three approaches

Every method rolls up into one of three families. A good valuation considers all three, then weights the one that fits the business.

| Approach | Core idea | Best when | Watch-out |
|---|---|---|---|
| **Asset (net asset value)** | Value = assets − liabilities | Asset-heavy (real estate, holding cos); a floor for any business | Ignores earning power / goodwill; usually understates a healthy operating company |
| **Market** | Price off comparable sales — a multiple of revenue or earnings | Enough comparable transactions exist | Truly comparable private deals are scarce; multiples vary wildly by quality |
| **Income** | Value = present value of expected future cash flows | Stable, forecastable cash flow | Sensitive to discount-rate and growth assumptions — small input changes swing the answer |

## The common methods

- **Book value** — assets minus liabilities off the balance sheet. The crude floor. Anchors on tangible value (e.g. cash on hand).
- **Revenue multiple** — value ≈ N × annual revenue. For sub-$10M service businesses, often **~1×** (varies a lot by margin and growth). Quick sanity check, not a precise tool.
- **EBITDA multiple** — value ≈ N × EBITDA, typically **3–7×** for small businesses (higher for scale, recurring revenue, growth). *Breaks down when EBITDA is near zero* — a break-even business shows almost no value on this method, which is why add-backs (below) become the battleground.
- **Discounted cash flow (DCF)** — project free cash flow, discount to present value at a rate reflecting risk (WACC). The Hallmark valuation used this. Components: a forecast period + a **terminal/residual value** (capitalize the final-year cash flow at a **capitalization rate** = discount rate − long-term growth rate). *Example from Hallmark: WACC less 3% growth → ~17% cap rate.*

## Adjustments that move the number

- **Owner-compensation add-backs** — when valuing on earnings, owner pay above (or below) market is added back to normalize EBITDA. **This is the classic seller lever:** a seller argues owners are *overpaid*, so "real" earnings are higher → higher value. The counter is **replacement cost**: what would it cost to hire someone at market to do that owner's job? Net of true replacement cost, the add-back often shrinks. *(Directly relevant to TSD: Carlos will likely push add-backs; note that Polly draws ~$91K and Carlos is hourly/part-time, so "market replacement" is the number to pin down.)*
- **Discount for lack of control (minority discount)** — a stake that can't make unilateral decisions is worth less than its pro-rata share. Often 5–15%+ depending on how real the powerlessness is. *(Hallmark: 5% for a 50% deadlock-prone stake.)*
- **Discount for lack of marketability (DLOM)** — a private-company interest can't be sold quickly like public stock, so it's discounted further. Studies (restricted-stock, pre-IPO) put this anywhere from ~5% to 30%+; driven by holding period, distributions, and transfer restrictions. *(Hallmark: 5%.)*
- **Control premium** — the inverse: a buyer acquiring control may pay above minority value for the ability to direct the business.

## Standards & framing (so the words mean something)

- **Fair Market Value (FMV)** — price between a hypothetical willing buyer and willing seller, neither compelled, both informed. The IRS standard (**Rev. Rul. 59-60**) for most transactions.
- **Standard of value matters** — FMV vs. *investment value* (worth to a specific buyer, who may pay more for synergies) vs. *fair value* (legal contexts). Same business, different numbers.
- **Level of value** — control vs. minority, marketable vs. non-marketable. Always ask *what level is being quoted* before comparing two valuations.
- Independent appraisals conform to **USPAP / ASA / AICPA SSVS** — credentialing that makes a number defensible to the IRS or a court.

## Practical takeaways (from the Hallmark comparable)

- **An appraisal is an anchor, not a ceiling.** Hallmark appraised at $1.43M and *closed at $1.23M* (~86%). Negotiated price ≠ appraised value.
- **Price vs. terms is a real lever.** Hallmark closed ~35% cash / 65% seller note. A seller wanting all cash can often be moved on price in exchange for financing (or vice versa).
- **Method choice is itself negotiation.** A break-even business favors the buyer on EBITDA multiples; a seller will steer toward add-backs or asset value. Know which method each side is incentivized to push.

## See also

- [3Ms framework](3ms-framework.md) · [TSD buyout financials](../projects/tsd-buyout/financials.md) · [Hallmark comparable](../projects/tsd-buyout/documents/hms-comparable-deal-2021-2022.md)
