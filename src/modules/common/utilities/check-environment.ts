export function isProductionEnv(): boolean {
    const ENV = process.env.NODE_ENV || '';
    return ENV.trim() === 'production';
}

export const isDeploymentEnv = (): boolean => {
    const ENV = process.env.NODE_ENV || '';
    return ENV.trim() === 'production' || ENV.trim() === 'staging';
};
