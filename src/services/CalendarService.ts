import moment from 'moment';

export class CalendarService {
    buildOpenDayPerYear(year: number, closedDays: DAYS[] = [DAYS.SATURDAY, DAYS.SUNDAY]): OpenDayPerYear {
        const result: OpenDayPerYear = {
            year,
            total: 0,
            openDayPerMonths: [],
        };
        for (let i = 0; i < 12; i++) {
            const currentOpenDayTotal: number = this.calculateOpenDaysInMonth(year, i, closedDays);
            result.total += currentOpenDayTotal;
            result.openDayPerMonths.push({
                total: currentOpenDayTotal,
                month: i,
            });
        }
        return result;
    }

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
