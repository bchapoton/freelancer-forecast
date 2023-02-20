export default class NumbersHelper {
    static rangedNumber(value: number, min: number | undefined, max: number | undefined): number {
        let result: number;
        result = max !== undefined && value > max ? max : value;
        result = min !== undefined && value < min ? min : result;
        return result;
    }
}
