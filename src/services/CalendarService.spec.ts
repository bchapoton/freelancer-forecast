import calendarService, { DAY, DayOffContext, PartTimeContext } from './CalendarService';

const partTimeContextFullTime: PartTimeContext = {
    percentage: 100,
};

const partTimeContextPartialTime: PartTimeContext = {
    percentage: 80,
};

const dayOffContext: DayOffContext = { value: 5, unit: 'weeks' };

const nonWorkingDaysDefault: DAY[] = [DAY.SATURDAY, DAY.SUNDAY];

const nonWorkingDaysEmpty: DAY[] = [];

describe('CalendarService tests', () => {
    it('days formatter', () => {
        expect<DAY[]>(calendarService.getDaysFromNumbers([6, 0])).toEqual(nonWorkingDaysDefault);

        expect<string>(calendarService.formatDays([0, 1], 'dd')).toEqual('Di, Lu');

        expect<string>(calendarService.formatDays([0, 1], 'ddd')).toEqual('dim., lun.');

        expect<string>(calendarService.formatDays([0, 1], 'dddd')).toEqual('dimanche, lundi');
    });

    it('part time', () => {
        expect<number>(calendarService.convertPartTimeToDays(5, partTimeContextPartialTime)).toEqual(4);
    });

    it('days off', () => {
        expect<number>(
            calendarService.convertDayOffToDays(dayOffContext, partTimeContextFullTime, nonWorkingDaysEmpty),
        ).toEqual(35);

        expect<number>(
            calendarService.convertDayOffToDays(dayOffContext, partTimeContextFullTime, nonWorkingDaysDefault),
        ).toEqual(25);

        expect<number>(
            calendarService.convertDayOffToDays(dayOffContext, partTimeContextPartialTime, nonWorkingDaysDefault),
        ).toEqual(20);

        expect<number[]>(
            calendarService.distributeDayOffPerMonth(dayOffContext, partTimeContextFullTime, nonWorkingDaysDefault),
        ).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]);
    });

    it('open days in month', () => {
        expect<number>(calendarService.calculateOpenDaysInMonth(2022, 0, [DAY.SATURDAY, DAY.SUNDAY])).toEqual(21);
        expect<number>(calendarService.calculateOpenDaysInMonth(2022, 0, [])).toEqual(31);
    });
});
