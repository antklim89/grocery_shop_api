

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        beforeSave(...data) {
            console.debug('beforeSave: \n', ...data);
        },
        beforeCreate(...data) {
            console.debug('beforeCreate: \n', ...data);
        },
        beforeUpdate(...data) {
            console.debug('beforeUpdate: \n', ...data);
        },
    },
};
