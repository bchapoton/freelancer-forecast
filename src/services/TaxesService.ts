export class TaxesService {
    getTaxBrackets(incomeSplittingParts: number = 1): TaxBracket[] {
        if (incomeSplittingParts > 1) {
            return taxBrackets.map((taxBracket: TaxBracket) => {
                const adjustBracket: TaxBracket = { ...taxBracket };
                adjustBracket.bottomBracket = adjustBracket.bottomBracket * incomeSplittingParts;
                adjustBracket.topBracket =
                    adjustBracket.topBracket === undefined
                        ? undefined
                        : adjustBracket.topBracket * incomeSplittingParts;
                return adjustBracket;
            });
        }
        return taxBrackets;
    }

    getContractorTaxAllowance(): number {
        return 0.34;
    }

    getFamilyTaxAllowance(): number {
        return 0.1;
    }

    getTaxes(contractorReferenceIncome: number, taxationFamilyContext: TaxationFamilyContext): IncomeTaxesResult {
        // Apply contractor's tax allowance
        let taxableReferenceIncome: number = (1 - this.getContractorTaxAllowance()) * contractorReferenceIncome;
        // Add family others revenues and apply the tax allowance
        if (taxationFamilyContext && taxationFamilyContext.taxableHouseholdRevenues > 0)
            taxableReferenceIncome +=
                (1 - this.getFamilyTaxAllowance()) * taxationFamilyContext.taxableHouseholdRevenues;

        const incomeTaxesResult: IncomeTaxesResult = {
            taxesBrackets: [],
            total: 0,
        };

        this.getTaxBrackets(taxationFamilyContext.incomeSplittingParts).forEach((taxBracket: TaxBracket) => {
            let bracketAmount: number;
            if (taxableReferenceIncome >= taxBracket.bottomBracket) {
                const topBracket =
                    !taxBracket.topBracket || taxableReferenceIncome <= taxBracket.topBracket
                        ? taxableReferenceIncome
                        : taxBracket.topBracket;
                bracketAmount = (topBracket - taxBracket.bottomBracket) * (taxBracket.rate / 100);
            } else bracketAmount = 0;
            incomeTaxesResult.taxesBrackets.push({ bracket: taxBracket, bracketAmount });
            incomeTaxesResult.total += bracketAmount;
        });

        return incomeTaxesResult;
    }

    getVAT(revenue: number): number {
        return 0.2 * revenue;
    }

    getTaxationFamilyContext(): TaxationFamilyContext {
        return { incomeSplittingParts: 3, taxableHouseholdRevenues: 26000 };
    }
}

const taxesService: TaxesService = new TaxesService();

export default taxesService;

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

export type IncomeTaxesResult = {
    taxesBrackets: TaxBracketResult[];
    total: number;
};

export type TaxBracketResult = {
    bracket: TaxBracket;
    bracketAmount: number;
};

export type TaxationFamilyContext = {
    incomeSplittingParts: number;
    taxableHouseholdRevenues: number;
};
