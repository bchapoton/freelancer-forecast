import moment from '../helpers/MomentHelper';

export class CalendarService {
    /**
     * Build OpenDayPerYear according to the partTimeContext, dayOffContext and closed days policies
     *
     * @param year target year
     * @param partTimeContext part time policies
     * @param dayOffContext day off policies
     * @param nonWorkingDays non-working day of the week
     */
    buildOpenDayPerYear(
        year: number,
        partTimeContext: PartTimeContext,
        dayOffContext: DayOffContext,
        nonWorkingDays: DAY[],
    ): OpenDayPerYear {
        const result: OpenDayPerYear = {
            year,
            total: 0,
            openDayPerMonths: [],
        };

        const offDaysPerMonth: number[] = this.distributeDayOffPerMonth(dayOffContext, partTimeContext, nonWorkingDays);

        for (let i = 0; i <= 11; i++) {
            const currentOpenDayTotal: number = this.calculateOpenDaysInMonth(year, i, nonWorkingDays);
            const partTimedDays: number = this.convertPartTimeToDays(currentOpenDayTotal, partTimeContext);
            const workedDays: number = partTimedDays - offDaysPerMonth[i];
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
     * @param partTimeContext the part time policies
     * @param nonWorkingDays the non-working days within the week
     * @return array of dispatched off days on each months, index is the month index from Date
     */
    distributeDayOffPerMonth(
        dayOffContext: DayOffContext,
        partTimeContext: PartTimeContext,
        nonWorkingDays: DAY[],
    ): number[] {
        const offDays: number = this.convertDayOffToDays(dayOffContext, partTimeContext, nonWorkingDays);
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
     * @param nonWorkingDays closed days within the week
     */
    calculateOpenDaysInMonth(year: number, month: number, nonWorkingDays: DAY[]): number {
        let result: number = 0;
        const date: Date = new Date();
        date.setFullYear(year, month, 1);
        const dayInMonth = moment(date).daysInMonth();
        for (let i = 1; i <= dayInMonth; i++) {
            if (nonWorkingDays.indexOf(date.getDay()) === -1) result++;
            date.setDate(i + 1);
        }
        return result;
    }

    /**
     * Calculate how many days in a year represents the dayOffContext
     *
     * @param dayOffContext the dayOffContext to convert.
     * @param partTimeContext the part time policies. Used for adjust the week duration
     * @param nonWorkingDays represent the non-working days within a week.
     */
    convertDayOffToDays(dayOffContext: DayOffContext, partTimeContext: PartTimeContext, nonWorkingDays: DAY[]): number {
        const openedDays: number = 7 - nonWorkingDays.length;
        let workingDay: number;
        if (partTimeContext.percentage === 100) {
            workingDay = openedDays;
        } else {
            // reduce the working day according to the part time policies
            workingDay = openedDays * (partTimeContext.percentage / 100);
        }
        return dayOffContext.value * workingDay;
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
            // add 0.4 to always round to the higher int
            return Math.round(factor * fullTimeDays + 0.4);
        }
    }

    /**
     * Displayed value of day off context
     *
     * @param dayOffContext
     */
    formatDayOffContext(dayOffContext: DayOffContext): string {
        return dayOffContext.value + ' semaines';
    }

    /**
     * Localized and join days array
     * @param days a DAY array to format
     * @param format day format from moment
     */
    formatDays(days: DAY[], format: 'dd' | 'ddd' | 'dddd' = 'ddd'): string {
        const daysLocalized: string[] = days.map<string>((day: DAY) => this.formatDay(day, format));
        return daysLocalized.join(', ');
    }

    /**
     * Localized and join days array
     * @param day the DAY to format
     * @param format day format from moment
     */
    formatDay(day: DAY, format: 'dd' | 'ddd' | 'dddd' = 'ddd'): string {
        return moment().weekday(day).format(format);
    }

    /**
     * Convert DAY number index array to DAY array
     *
     * @param indexes DAY indexes
     */
    getDaysFromNumbers(indexes: number[]): DAY[] {
        const result: DAY[] = [];
        indexes.forEach((index: number) => {
            if (DayEnumWrapper[index] !== null && DayEnumWrapper[index] !== undefined)
                result.push(DayEnumWrapper[index]);
        });
        return result;
    }
}

const calendarService: CalendarService = new CalendarService();

export default calendarService;

export enum DAY {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
}

/**
 * Workaround to map index number value to a real DAY enum value
 * don't figured out how handle properly enum manipulation in TypeScript without type issues when handle an array of it
 */
const DayEnumWrapper: DAY[] = [
    DAY.SUNDAY,
    DAY.MONDAY,
    DAY.TUESDAY,
    DAY.WEDNESDAY,
    DAY.THURSDAY,
    DAY.FRIDAY,
    DAY.SATURDAY,
];

export function getDayEnumProperKeys(): number[] {
    // typescript enum seem not expose proper keys() function
    return Object.keys(DAY)
        .filter((value) => {
            // extract only number keys, there are the number value from enum
            return !isNaN(parseInt(value));
        })
        .map((value: string) => parseInt(value));
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
    unit: 'weeks';
};

export type PartTimeContext = {
    percentage: number;
};
