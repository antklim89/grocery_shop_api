

module.exports = {
    lifecycles: {
        beforeCreate(data) {
            data.discountPrice = data.price - ((data.price / 100) * data.discount);
        },
        beforeUpdate(params, data) {
            data.discountPrice = data.price - ((data.price / 100) * data.discount);
        },
    },
};
