const _ = require('lodash');


async function updateOrCreate(data) {
    const product = await strapi.query('product').findOne({ id: data.product });

    if (!product) {
        throw new Error('Product is required');
    }
}

module.exports = {
    lifecycles: {
        async beforeCreate(data) {
            if (_.isNil(data.product)) {
                throw new Error('Product is required');
            }
            await updateOrCreate(data);
        },
        async beforeUpdate(filter, data) {
            if ('product' in data && _.isNil(data.product)) {
                throw new Error('Product is required');
            }
            if ('product' in data) {
                await updateOrCreate(data);
            }
        },
    },
};


