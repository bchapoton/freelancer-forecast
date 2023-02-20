import taxesService, { IncomeTaxesSummary, TaxationFamilyContext } from './TaxesService';
import { expectedIncomeTaxesSummaryAlone } from '../helpers/TestsCommonsParams';

describe('TaxesService tests', () => {
    it('Taxes', () => {
        expect<IncomeTaxesSummary>(
            taxesService.getIncomeTaxesSummary(contractorRevenue, contractorTaxAllowance, taxationFamilyContextAlone),
        ).toEqual(expectedIncomeTaxesSummaryAlone);

        expect<IncomeTaxesSummary>(
            taxesService.getIncomeTaxesSummary(
                contractorRevenue,
                contractorTaxAllowance,
                taxationFamilyContextWithFamily,
            ),
        ).toEqual(expectedIncomeTaxesSummaryWithFamily);
    });
});

const contractorRevenue: number = 100000;
const contractorTaxAllowance: number = 34;

const taxationFamilyContextAlone: TaxationFamilyContext = {
    incomeSplittingParts: 1,
    taxAllowance: 0.1,
    taxableHouseholdRevenues: 0,
};

const taxationFamilyContextWithFamily: TaxationFamilyContext = {
    incomeSplittingParts: 3,
    taxAllowance: 0.1,
    taxableHouseholdRevenues: 25000,
};

const expectedIncomeTaxesSummaryWithFamily: IncomeTaxesSummary = {
    taxBracketSummaries: [
        { bracket: { bottomBracket: 0, topBracket: 10225, rate: 0 }, amount: 0 },
        { bracket: { bottomBracket: 10226, topBracket: 26070, rate: 11 }, amount: 1743 },
        { bracket: { bottomBracket: 26071, topBracket: 74545, rate: 30 }, amount: 1276 },
        { bracket: { bottomBracket: 74546, topBracket: 160336, rate: 41 }, amount: 0 },
        { bracket: { bottomBracket: 160336, rate: 45 }, amount: 0 },
    ],
    netTaxableIncome: {
        contractorNetTaxableIncome: 66000,
        familyNetTaxableIncome: 24975,
        incomeSplittingParts: 3,
        netTaxableIncomeResult: 30325,
    },
    total: 3019,
};
