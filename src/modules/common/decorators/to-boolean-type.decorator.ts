import { Transform } from 'class-transformer';

/**
 * Note: While receiving form data/ multipart upload, the value is either 'true' or 'false' (string).
 * This decorator converts the value to boolean.
 * Please use this decorator only on boolean properties.
 * On each form data/ multipart upload request.
 *
 */
export function ToBoolean(): PropertyDecorator {
    return Transform(({ value }) => String(value).toLowerCase() === 'true');
}
