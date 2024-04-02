// Env variables can override these variables
export const DEFAULT_PORT_NUMBER = 4000;
export const CACHE_CONFIG = {
    ttl: 300_000, // 5 minutes in milliseconds (https://docs.nestjs.com/techniques/caching)
    maxSize: 1000, // Number of items in cache,
};
