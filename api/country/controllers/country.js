'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async enumerate(ctx) {
        const result = await strapi
            .query('country')
            .find()

        return result.map((i) => i.name)
    }
};
