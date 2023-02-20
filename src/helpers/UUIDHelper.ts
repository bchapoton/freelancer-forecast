import { v4 } from 'uuid';

export function generateUID(): string {
    return v4();
}
