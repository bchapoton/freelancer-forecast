export class TaxesService {
    /**
     * Get tax brackets object
     */
    getTaxBrackets(): TaxBracket[] {
        return taxBrackets;
    }

    /**
     * Build income taxes summary
     *
     * @param contractorRevenue
     * @param contractorTaxAllowance tax allowance for the company. i.e. 34 (for 34%)
     * @param taxationFamilyContext taxation family context
     */
    getIncomeTaxesSummary(
        contractorRevenue: number,
        contractorTaxAllowance: number,
        taxationFamilyContext: TaxationFamilyContext,
    ): IncomeTaxesSummary {
        // Apply contractor's tax allowance
        const contractorNetTaxableIncome: number = (1 - contractorTaxAllowance / 100) * contractorRevenue;
        let familyNetTaxableIncome: number = 0;
        // Add family others revenues and apply the tax allowance
        if (taxationFamilyContext && taxationFamilyContext.taxableHouseholdRevenues > 0)
            familyNetTaxableIncome =
                (1 - taxationFamilyContext.taxAllowance / 100) * taxationFamilyContext.taxableHouseholdRevenues;

        let taxableReferenceIncome: number = contractorNetTaxableIncome + familyNetTaxableIncome;
        if (taxationFamilyContext.incomeSplittingParts > 0) {
            taxableReferenceIncome = taxableReferenceIncome / taxationFamilyContext.incomeSplittingParts;
        }

        const incomeTaxesSummary: IncomeTaxesSummary = {
            taxBracketSummaries: [],
            netTaxableIncome: {
                contractorNetTaxableIncome: Math.round(contractorNetTaxableIncome),
                familyNetTaxableIncome: Math.round(familyNetTaxableIncome),
                incomeSplittingParts: taxationFamilyContext.incomeSplittingParts,
                netTaxableIncomeResult: Math.round(taxableReferenceIncome),
            },
            total: 0,
        };

        this.getTaxBrackets().forEach((taxBracket: TaxBracket) => {
            let bracketAmount: number;
            if (taxableReferenceIncome >= taxBracket.bottomBracket) {
                const topBracket =
                    !taxBracket.topBracket || taxableReferenceIncome <= taxBracket.topBracket
                        ? taxableReferenceIncome
                        : taxBracket.topBracket;
                bracketAmount = Math.round((topBracket - taxBracket.bottomBracket) * (taxBracket.rate / 100));
            } else bracketAmount = 0;
            incomeTaxesSummary.taxBracketSummaries.push({ bracket: taxBracket, amount: bracketAmount });
            incomeTaxesSummary.total += bracketAmount;
        });

        return incomeTaxesSummary;
    }
}

const taxesService: TaxesService = new TaxesService();

export default taxesService;

/**
 * Tax brackets 2022 from https://www.service-public.fr/particuliers/vosdroits/F1419
 */
const taxBrackets: TaxBracket[] = [
    {
        bottomBracket: 0,
        topBracket: 10225,
        rate: 0,
    },
    {
        bottomBracket: 10226,
        topBracket: 26070,
        rate: 11,
    },
    {
        bottomBracket: 26071,
        topBracket: 74545,
        rate: 30,
    },
    {
        bottomBracket: 74546,
        topBracket: 160336,
        rate: 41,
    },
    {
        bottomBracket: 160336,
        rate: 45,
    },
];

export type TaxBracket = {
    bottomBracket: number;
    /**
     * if null this the last tax bracket
     */
    topBracket?: number;
    /**
     * taxation rate for this bracket
     */
    rate: number;
};

export type NetTaxableIncome = {
    /**
     * The contractor's net taxable income after tax allowance was applied
     */
    contractorNetTaxableIncome: number;
    /**
     * The family's net taxable income after tax allowance was applied
     */
    familyNetTaxableIncome: number;
    /**
     * The family income splitting part
     */
    incomeSplittingParts: number;
    /**
     * The net taxable income merged with family and contractor net taxable income, divided by the income splitting parts
     */
    netTaxableIncomeResult: number;
};

/**
 * Hold taxBracketSummaries for each bracket, and the total of it
 */
export type IncomeTaxesSummary = {
    taxBracketSummaries: TaxBracketSummary[];
    netTaxableIncome: NetTaxableIncome;
    total: number;
};

/**
 * Hold amount of tax on the bracket
 */
export type TaxBracketSummary = {
    bracket: TaxBracket;
    amount: number;
};

/**
 * Family situation
 */
export type TaxationFamilyContext = {
    incomeSplittingParts: number;
    taxableHouseholdRevenues: number;
    /**
     * Tax allowance percentage. i.e. 10
     */
    taxAllowance: number;
};
