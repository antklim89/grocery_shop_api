

module.exports = {
    lifecycles: {
        async afterFind(data) {
            await Promise.all(data.map((cartItem, index) => {
                if (cartItem.product?.id) return null;
                data.splice(index, 1);
                return strapi.query('cart').delete({ id: cartItem.id });
            }));
        },
        async afterFindOne(...args) {
            console.debug('afterFindOne: \n', args);
        },
    },
};

