import configFactory from './config';

const config = configFactory();

export { config };
export { environmentVariableValidator } from './environment-variable-validator';
