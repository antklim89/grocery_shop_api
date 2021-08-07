

module.exports = {
    async enumerate() {
        const result = await strapi
            .query('category')
            .find();

        return result.map((i) => i.name);
    },
};
