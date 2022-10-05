import { ParametersState, Saving, SocialContribution } from '../redux/slices/ParametersSlice';
import calendarService, { OpenDayPerMonth, OpenDayPerYear } from './CalendarService';

export class ParametersService {
    buildFinancialYearSummary(parameters: ParametersState): YearSummary {
        const openDaysYear: OpenDayPerYear = calendarService.buildOpenDayPerYear(
            parameters.year,
            parameters.partTime,
            parameters.dayOffContext,
        );
        const monthSummaries: MonthSummary[] = [];
        const totalSummary: TotalSummary = this.buildEmptyTotalSummary();

        openDaysYear.openDayPerMonths.forEach((openDayPerMonth: OpenDayPerMonth) => {
            const totalDays = openDayPerMonth.total;
            const revenue = totalDays * parameters.averageDailyRate;
            const vat = this.calculateVAT(revenue, parameters.vatRate);
            const includingTax: number = revenue + vat;
            const socialContribution = this.calculateSocialContributions(revenue, parameters.socialContribution);
            const profits = revenue - socialContribution;

            const currentMonthSummary = {
                month: openDayPerMonth.month,
                totalDays: openDayPerMonth.total,
                revenue,
                vat,
                includingTax,
                socialContribution,
                profits,
            };

            monthSummaries.push(currentMonthSummary);

            totalSummary.totalDays += currentMonthSummary.totalDays;
            totalSummary.revenue += currentMonthSummary.revenue;
            totalSummary.vat += currentMonthSummary.vat;
            totalSummary.includingTax += currentMonthSummary.includingTax;
            totalSummary.socialContribution += currentMonthSummary.socialContribution;
            totalSummary.profits += currentMonthSummary.profits;
        });

        return { monthSummaries: monthSummaries, totals: totalSummary };
    }

    calculateVAT(revenue: number, rate: number): number {
        return revenue * (rate / 100);
    }

    calculateSocialContributions(revenue: number, socialContribution: SocialContribution[]): number {
        const rate: number = this.calculateSocialContributionsRate(socialContribution);
        return revenue * (rate / 100);
    }

    calculateSocialContributionsRate(socialContribution: SocialContribution[]): number {
        let rate: number = 0;
        socialContribution.forEach((socialContribution: SocialContribution) => (rate += socialContribution.rate));
        return rate;
    }

    buildEmptyTotalSummary(): TotalSummary {
        return {
            totalDays: 0,
            includingTax: 0,
            socialContribution: 0,
            vat: 0,
            profits: 0,
            revenue: 0,
        };
    }

    calculateSaving(revenue: number, saving: Saving): number {
        if (saving.mode === 'value') return Math.max(revenue, saving.value);
        else if (saving.mode === 'percentage') return revenue * (saving.value / 100);
        else return 0;
    }
}

const parametersService: ParametersService = new ParametersService();

export default parametersService;

export type BaseParent = {
    totalDays: number;
    revenue: number;
    vat: number;
    includingTax: number;
    socialContribution: number;
    profits: number;
};

export type MonthSummary = BaseParent & {
    month: number;
};

export type TotalSummary = BaseParent;

export type YearSummary = {
    monthSummaries: MonthSummary[];
    totals: TotalSummary;
};
