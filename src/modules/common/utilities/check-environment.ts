export function isProductionEnvironment(): boolean {
    const ENV = process.env.NODE_ENV ?? '';

    return ENV.trim() === 'production';
}

export const isDeployedEnvironment = (): boolean => {
    const ENV = process.env.NODE_ENV ?? '';

    return ENV.trim() === 'production' || ENV.trim() === 'staging';
};
