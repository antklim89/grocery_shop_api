const _ = require('lodash');


module.exports = {
    lifecycles: {
        beforeCreate(product) {
            product.discountPrice = product.price - ((product.price / 100) * product.discount);

            if (_.isNil(product.category)) {
                throw new Error('Category is required');
            }
            if (_.isNil(product.country)) {
                throw new Error('Country is required');
            }
        },
        beforeUpdate(params, product) {
            if ('price' in product && 'discount' in product) {
                product.discountPrice = product.price - ((product.price / 100) * product.discount);
            }
            if ('category' in product && _.isNil(product.category)) {
                throw new Error('Category is required');
            }
            if ('country' in product && _.isNil(product.country)) {
                throw new Error('Country is required');
            }
        },
        async beforeDelete(product) {
            await strapi.query('cart').delete({ product: product.id });
        },
    },
};

