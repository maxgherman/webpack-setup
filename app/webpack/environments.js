// @ts-check

const values = Object.freeze({
    Prod: 'production',
    Development: 'development'
})

/**
 * @param {string=} env
 */
module.exports = (env) => {

    env = env || process.env.NODE_ENV

    return {
        get isProduction() {
            return env === values.Prod
        },

        get isDevelopment() {
            return env === values.Development
        },

        get isForAnalysis() {
            return (process.env.ANALYSE || '').toUpperCase() === 'TRUE'
        },

        get current() {
            return env
        }
    }
}
