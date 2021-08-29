const { v4 } = require('uuid');


module.exports = {
    lifecycles: {
        beforeCreate(order) {
            order.uid = v4();
        },
    },
};
