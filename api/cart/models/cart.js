

async function updateOrCreate(data) {
    if ('product' in data && !data.product) {
        throw new Error('Product is required');
    }
    const product = await strapi.query('product').findOne({ id: data.product });

    if (!product) {
        throw new Error('Product is required');
    }
}

module.exports = {
    lifecycles: {
        async beforeCreate(cartInput) {
            await updateOrCreate(cartInput);
        },
        async beforeUpdate(filter, cartInput) {
            await updateOrCreate(cartInput);
        },
    },
};


