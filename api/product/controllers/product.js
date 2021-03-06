const faker = require('faker');
const _ = require('lodash');


module.exports = {
    async devdata() {
        const categoryList = _.uniq(_.times(10, faker.commerce.productMaterial));
        const countryList = _.uniq(_.times(10, faker.address.country));
        const productList = _.uniq(_.times(50, faker.commerce.productName));
        const featureList = [
            'Fresh Vegies & Fruits',
            'Locally Grown Vegetables',
            'Natural As It\'s In Nature',
            'From Country Side',
            'Alkaline Water',
            'Fresh Air',
        ];
        const unit = ['kilogram', 'gram', 'liter', 'mililiter', 'piece', 'ton'];
        const quantityPerUnit = [1, 10, 100, 1000, 250, 50, 500];

        const imagesData = await strapi.connections.default.raw('SELECT id FROM upload_file;');

        const images = imagesData.rows || imagesData;

        await strapi.services.order.delete({});
        await strapi.services.cart.delete({});

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
                description: faker.commerce.productDescription(),
                price: _.random(10, 100, false),
                discount: _.random(0, 100) > 50 ? _.random(0, 80, false) : 0,
                unit: _.sample(unit),
                quantityPerUnit: _.sample(quantityPerUnit),
                country: _.sample(_.map(countries, 'id')),
                category: _.sample(_.map(categories, 'id')),
                mainImage: _.sample(images),
                images: _.sampleSize(_.map(images, 'id'), 3),
            })
        )));

        await strapi.services.feature.delete({});
        await Promise.all(featureList.map((feature) => (
            strapi.services.feature.create({
                title: feature,
                feature: faker.lorem.sentences(5),
                image: _.sample(_.map(images, 'id')),
            })
        )));

        await strapi.services.about.createOrUpdate({
            title: 'About Us',
            body: faker.lorem.sentences(7),
            image: _.sample(_.map(images, 'id')),
        });

        await strapi.services.hero.createOrUpdate({
            title: '100% NATURAL!',
            text: faker.lorem.sentences(7),
            image: _.sample(_.map(images, 'id')),
            secondText: 'fresh & non-gmo products',
        });

        return true;
    },
};
