

function createOrUpdate(data) {
    data.discountPrice = data.price - ((data.price / 100) * data.discount);
    if (!data.category) {
        throw new Error('Category is required');
    }
    if (!data.country) {
        throw new Error('Country is required');
    }
}


module.exports = {
    lifecycles: {
        beforeCreate(data) {
            createOrUpdate(data);
        },
        beforeUpdate(params, data) {
            createOrUpdate(data);
        },
    },
};

