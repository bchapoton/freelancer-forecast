import parametersService, { YearSummary } from './ParametersService';
import { Saving, SocialContribution } from '../redux/slices/ParametersSlice';
import { expectedYearSummary, parameters } from '../helpers/TestsCommonsParams';

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
