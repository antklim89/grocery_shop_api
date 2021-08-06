const _ = require('lodash');


module.exports = {
    async devdata() {
        const categoryList = ['vegetable', 'fruit', 'juiсу', 'berry'];
        const countryList = ['Russia', 'Egypt', 'Spain', 'India'];
        const productList = ['Tomato', 'Potato', 'Carrot', 'Beet', 'Apple', 'Apple juice', 'Grape'];


        await strapi.services.category.delete({});
        const categories = await Promise.all(categoryList.map((category) => (
            strapi.services.category.create({ name: category })
        )));

        await strapi.services.country.delete({});
        const countries = await Promise.all(countryList.map((country) => (
            strapi.services.country.create({ name: country })
        )));

        await strapi.services.product.delete({});
        await Promise.all(productList.map((product) => (
            strapi.services.product.create({
                name: product,
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                price: _.random(10, 100, false),
                discount: _.random(0, 80, false),
                measure: 'kilogram',
                unit: 1,
                country: _.sample(_.map(countries, 'id')),
                category: _.sample(_.map(categories, 'id')),
                mainImage: 11,
                images: [16, 11],
            })
        )));


        return true;
    },
};
