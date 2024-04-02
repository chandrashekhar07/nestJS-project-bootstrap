import { Transform } from 'class-transformer';

export function CommaSeparatedStringToArray(): PropertyDecorator {
    return Transform(({ value }) => {
        if (value && typeof value === 'string') {
            return value.split(',');
        }

        return value;
    });
}
