import parametersService, { YearSummary } from './ParametersService';
import { ParametersState, Saving, SocialContribution } from '../redux/slices/ParametersSlice';
import { DAY } from './CalendarService';

describe('ParametersService tests', () => {
    it('Taxes', () => {
        expect<number>(parametersService.calculateSocialContributionsRate(socialContributions)).toEqual(22.4);

        expect<number>(Math.round(parametersService.calculateSocialContributions(1000, socialContributions))).toEqual(
            224,
        );

        expect<number>(parametersService.calculateVAT(1000, 20)).toEqual(200);
    });

    it('Saving', () => {
        expect<number>(parametersService.calculateSaving(1000, savingDefault)).toEqual(200);

        expect<number>(parametersService.calculateSaving(1000, savingNone)).toEqual(1000);
    });

    it('Summary', () => {
        expect<YearSummary>(parametersService.buildYearSummary(parameters)).toEqual(expectedYearSummary);
    });
});

const socialContributions: SocialContribution[] = [
    { rate: 22.2, label: 'SC1' },
    { rate: 0.2, label: 'SC2' },
];

const savingDefault: Saving = {
    value: 20,
    mode: 'percentage',
};

const savingNone: Saving = {
    value: 0,
    mode: 'percentage',
};

const parameters: ParametersState = {
    averageDailyRate: 550,
    year: 2022,
    vatRate: 20,
    taxAllowance: 34,
    socialContribution: [
        { rate: 22.2, label: 'Prestations de services (bnc et bic) et vente de marchandises (bic)' },
        { rate: 0.2, label: 'Formation prof.liberale obligatoire' },
    ],
    taxationFamilyContext: {
        incomeSplittingParts: 3,
        taxableHouseholdRevenues: 24506,
        taxAllowance: 10,
    },
    saving: { mode: 'percentage', value: 20 },
    partTime: { percentage: 100 },
    dayOffContext: { unit: 'weeks', value: 5 },
    nonWorkingDays: [DAY.SATURDAY, DAY.SUNDAY],
};

const expectedYearSummary: YearSummary = {
    monthSummaries: [
        {
            month: 0,
            totalDays: 19,
            revenue: 10450,
            vat: 2090,
            includingTax: 12540,
            socialContribution: 2340.7999999999997,
            profits: 8109.200000000001,
        },
        {
            month: 1,
            totalDays: 18,
            revenue: 9900,
            vat: 1980,
            includingTax: 11880,
            socialContribution: 2217.6,
            profits: 7682.4,
        },
        {
            month: 2,
            totalDays: 21,
            revenue: 11550,
            vat: 2310,
            includingTax: 13860,
            socialContribution: 2587.2,
            profits: 8962.8,
        },
        {
            month: 3,
            totalDays: 19,
            revenue: 10450,
            vat: 2090,
            includingTax: 12540,
            socialContribution: 2340.7999999999997,
            profits: 8109.200000000001,
        },
        {
            month: 4,
            totalDays: 20,
            revenue: 11000,
            vat: 2200,
            includingTax: 13200,
            socialContribution: 2463.9999999999995,
            profits: 8536,
        },
        {
            month: 5,
            totalDays: 20,
            revenue: 11000,
            vat: 2200,
            includingTax: 13200,
            socialContribution: 2463.9999999999995,
            profits: 8536,
        },
        {
            month: 6,
            totalDays: 19,
            revenue: 10450,
            vat: 2090,
            includingTax: 12540,
            socialContribution: 2340.7999999999997,
            profits: 8109.200000000001,
        },
        {
            month: 7,
            totalDays: 21,
            revenue: 11550,
            vat: 2310,
            includingTax: 13860,
            socialContribution: 2587.2,
            profits: 8962.8,
        },
        {
            month: 8,
            totalDays: 20,
            revenue: 11000,
            vat: 2200,
            includingTax: 13200,
            socialContribution: 2463.9999999999995,
            profits: 8536,
        },
        {
            month: 9,
            totalDays: 19,
            revenue: 10450,
            vat: 2090,
            includingTax: 12540,
            socialContribution: 2340.7999999999997,
            profits: 8109.200000000001,
        },
        {
            month: 10,
            totalDays: 20,
            revenue: 11000,
            vat: 2200,
            includingTax: 13200,
            socialContribution: 2463.9999999999995,
            profits: 8536,
        },
        {
            month: 11,
            totalDays: 19,
            revenue: 10450,
            vat: 2090,
            includingTax: 12540,
            socialContribution: 2340.7999999999997,
            profits: 8109.200000000001,
        },
    ],
    totals: {
        totalDays: 235,
        includingTax: 155100,
        socialContribution: 28952,
        vat: 25850,
        profits: 100298,
        revenue: 129250,
    },
};
