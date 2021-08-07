

module.exports = {
    async enumerate() {
        const result = await strapi
            .query('country')
            .find();

        return result.map((i) => i.name);
    },
};
