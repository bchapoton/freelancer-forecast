import { ParametersState, Saving, SocialContribution } from '../redux/slices/ParametersSlice';
import calendarService, { OpenDayPerMonth, OpenDayPerYear } from './CalendarService';

export class ParametersService {
    /**
     * Calculate financial report from the contractor parameters
     *
     * @param parameters
     */
    buildYearSummary(parameters: ParametersState): YearSummary {
        const openDaysYear: OpenDayPerYear = calendarService.buildOpenDayPerYear(
            parameters.year,
            parameters.partTime,
            parameters.dayOffContext,
            parameters.nonWorkingDays,
        );
        const monthSummaries: MonthSummary[] = [];
        const totalSummary: TotalSummary = this.buildEmptyTotalSummary();

        openDaysYear.openDayPerMonths.forEach((openDayPerMonth: OpenDayPerMonth) => {
            let totalDays: number;
            // if month is unselected we don't work any day in this month
            if (parameters.selectedMonths.indexOf(openDayPerMonth.month) === -1) {
                totalDays = 0;
            } else {
                totalDays = openDayPerMonth.total;
            }
            const revenue = totalDays * parameters.averageDailyRate;
            const vat = this.calculateVAT(revenue, parameters.vatRate);
            const includingTax: number = revenue + vat;
            const socialContribution = this.calculateSocialContributions(revenue, parameters.socialContribution);
            const profits = revenue - socialContribution;

            const currentMonthSummary = {
                month: openDayPerMonth.month,
                totalDays: totalDays,
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

    /**
     * Calculate amount of VAT on revenue
     *
     * @param revenue
     * @param rate
     */
    calculateVAT(revenue: number, rate: number): number {
        return revenue * (rate / 100);
    }

    /**
     * Calculate amount of social contributions to revenue
     *
     * @param revenue
     * @param socialContributions
     */
    calculateSocialContributions(revenue: number, socialContributions: SocialContribution[]): number {
        const rate: number = this.calculateSocialContributionsRate(socialContributions);
        return revenue * (rate / 100);
    }

    /**
     * Merge SocialContribution in a single rate
     *
     * @param socialContributions
     */
    calculateSocialContributionsRate(socialContributions: SocialContribution[]): number {
        let rate: number = 0;
        socialContributions.forEach((socialContribution: SocialContribution) => (rate += socialContribution.rate));
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

    /**
     * Apply saving policies on revenue
     *
     * @param revenue base revenue
     * @param saving saving policies
     */
    calculateSaving(revenue: number, saving: Saving): number {
        if (saving.value === 0) {
            return revenue;
        }
        return revenue * (saving.value / 100);
    }
}

const parametersService: ParametersService = new ParametersService();

export default parametersService;

/**
 * Common properties in MonthSummary and TotalSummary
 */
type BaseParentSummary = {
    totalDays: number;
    revenue: number;
    vat: number;
    includingTax: number;
    socialContribution: number;
    profits: number;
};

/**
 * Financial summary on month scope
 */
export type MonthSummary = BaseParentSummary & {
    /**
     * month index from Date (0 - 11)
     */
    month: number;
};

/**
 * Total summary of a year
 */
export type TotalSummary = BaseParentSummary;

/**
 * Hold monthSummaries and reduce them into TotalSummary
 */
export type YearSummary = {
    monthSummaries: MonthSummary[];
    totals: TotalSummary;
};
