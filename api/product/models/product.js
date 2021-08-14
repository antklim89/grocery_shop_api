

module.exports = {
    beforeSave(...data) {
        console.debug('data: \n', ...data);
    },
    beforeUpdate(...data) {
        console.debug('data: \n', ...data);
    },
};
