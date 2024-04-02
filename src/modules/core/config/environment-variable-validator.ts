import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EnvironmentVariable } from './environment-variable.model';

export const environmentVariableValidator = (): NodeJS.ProcessEnv => {
    const { env } = process;

    const configObject = plainToInstance(EnvironmentVariable, env, {
        enableImplicitConversion: true,
    });

    const validationErrors = validateSync(configObject, {
        skipMissingProperties: false,
    });

    /**
     * Note:
     * In github actions, while running tests, the env variables are not available.
     * We had set the NODE_ENV to test in the github actions workflow file.
     * We are skipping the validation when the NODE_ENV is set to test.
     */

    // eslint-disable-next-line no-magic-numbers
    if (env.NODE_ENV !== 'test' && validationErrors.length > 0) {
        throw new Error(validationErrors.toString());
    }

    return env;
};
