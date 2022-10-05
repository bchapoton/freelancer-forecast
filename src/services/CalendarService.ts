import moment from 'moment';

export class CalendarService {
    buildOpenDayPerYear(
        year: number,
        partTimeContext: PartTimeContext,
        dayOffContext: DayOffContext,
        closedDays: DAYS[] = [DAYS.SATURDAY, DAYS.SUNDAY],
    ): OpenDayPerYear {
        const result: OpenDayPerYear = {
            year,
            total: 0,
            openDayPerMonths: [],
        };

        const offDaysPerMonth = this.distributeDayOffPerMonth(dayOffContext);

        for (let i = 0; i <= 11; i++) {
            const currentOpenDayTotal: number = this.calculateOpenDaysInMonth(year, i, closedDays);
            const partTimedDays = this.convertPartTimeToDays(currentOpenDayTotal, partTimeContext);
            const workedDays = partTimedDays - offDaysPerMonth[i];
            result.total += workedDays;
            result.openDayPerMonths.push({
                total: workedDays,
                month: i,
            });
        }
        return result;
    }

    /**
     * Distribute evenly the day off on each month, add the rest of the division on last month
     *
     * @param dayOffContext the day off context
     * @return array of dispatched off days on each months, index is the month index
     */
    distributeDayOffPerMonth(dayOffContext: DayOffContext): number[] {
        const offDays: number = this.convertDayOffToDays(dayOffContext);
        const dayOffPerMonth: number[] = [];
        const modulo = offDays % 12;
        const offDaysPerMonth = (offDays - (offDays % 12)) / 12;
        for (let i = 0; i <= 11; i++) {
            if (modulo !== 0 && i === 11) {
                dayOffPerMonth[i] = offDaysPerMonth + modulo;
            } else dayOffPerMonth[i] = offDaysPerMonth;
        }
        return dayOffPerMonth;
    }

    /**
     * Calculate the number of opened days in the given month
     *
     * @param year target year i.e. 2022
     * @param month target month (from Date : An integer between 0 and 11 representing the months January through December.)
     * @param closedDays closed days within the week
     */
    calculateOpenDaysInMonth(year: number, month: number, closedDays: DAYS[] = [DAYS.SATURDAY, DAYS.SUNDAY]): number {
        let result: number = 0;
        const date: Date = new Date();
        date.setFullYear(year, month, 1);
        const dayInMonth = moment(date).daysInMonth();
        for (let i = 1; i <= dayInMonth; i++) {
            if (closedDays.indexOf(date.getDay()) === -1) result++;
            date.setDate(i + 1);
        }
        return result;
    }

    /**
     * Calculate how many days in a year represents the dayOffContext
     *
     * @param dayOffContext the dayOffContext to convert. In month unit we round a month to 22 days (include closed days).
     * @param closedDays represent the closed days within a week.
     */
    convertDayOffToDays(dayOffContext: DayOffContext, closedDays: DAYS[] = [DAYS.SATURDAY, DAYS.SUNDAY]): number {
        if (dayOffContext.unit === 'days') {
            return dayOffContext.value;
        } else if (dayOffContext.unit === 'weeks') {
            return dayOffContext.value * (7 - closedDays.length);
        } else if (dayOffContext.unit === 'months') {
            return dayOffContext.value * 22;
        }
        return 0;
    }

    /**
     * reduce full time days according to the part time context
     *
     * @param fullTimeDays number of days in full time job
     * @param partTimeContext the part time context to convert
     * @return number of days rounded
     */
    convertPartTimeToDays(fullTimeDays: number, partTimeContext: PartTimeContext): number {
        if (partTimeContext.percentage === 100) return fullTimeDays;
        else {
            const factor: number = 1 - (100 - partTimeContext.percentage) / 100;
            // add 0.5 to always round to the higher int
            return Math.round(factor * fullTimeDays + 0.5);
        }
    }
}

const calendarService: CalendarService = new CalendarService();

export default calendarService;

export enum DAYS {
    MONDAY = 0,
    TUESDAY = 1,
    WEDNESDAY = 2,
    THURSDAY = 3,
    FRIDAY = 4,
    SATURDAY = 5,
    SUNDAY = 6,
}

export type OpenDayPerYear = {
    year: number;
    total: number;
    openDayPerMonths: OpenDayPerMonth[];
};

export type OpenDayPerMonth = {
    month: number;
    total: number;
};

export type DayOffContext = {
    value: number;
    unit: 'days' | 'weeks' | 'months';
};

export type PartTimeContext = {
    percentage: number;
};
