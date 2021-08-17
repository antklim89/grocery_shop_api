

function createOrUpdate(product) {
    product.discountPrice = product.price - ((product.price / 100) * product.discount);
    if ('category' in product && !product.category) {
        throw new Error('Category is required');
    }
    if ('country' in product && !product.country) {
        throw new Error('Country is required');
    }
}


module.exports = {
    lifecycles: {
        beforeCreate(product) {
            createOrUpdate(product);
        },
        beforeUpdate(params, product) {
            createOrUpdate(product);
        },
        async beforeDelete(product) {
            await strapi.query('cart').delete({ product: product.id });
        },
    },
};

