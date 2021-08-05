

const _ = require('lodash');
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
        const { user } = ctx.state;

        const entities = ctx.query._q
            ? await strapi.services.cart.search({ ...ctx.query, user: user.id })
            : await strapi.services.cart.find({ ...ctx.query, user: user.id });

        return entities.map((entity) => sanitizeEntity(entity, { model: strapi.models.cart }));
    },

    async findOne(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state;

        const entity = await strapi.services.cart.findOne({ id, user: user.id });
        return sanitizeEntity(entity, { model: strapi.models.cart });
    },

    async create(ctx) {
        const { body } = ctx.request;
        const { user } = ctx.state;

        const entity = await strapi.services.cart.create({ ...body, user: user.id });
        return sanitizeEntity(entity, { model: strapi.models.cart });
    },

    async update(ctx) {
        const { id } = ctx.params;
        const { body } = ctx.request;
        const { user } = ctx.state;

        const entity = await strapi.services.cart.update({ id, user: user.id }, { ...body });
        return sanitizeEntity(entity, { model: strapi.models.cart });
    },

    async refresh(ctx) {
        const { body } = ctx.request;
        const { user } = ctx.state;


        const prevCartItems = await strapi.services.cart.find({ user: user.id });

        if (Array.isArray(body)) {
            await Promise.all(body.map(async (newItem) => {
                const cartInDB = prevCartItems.find((i) => i.product.id == newItem.product);
                if (cartInDB) return;

                const createdCartItem = await strapi.services.cart.create({
                    qty: newItem.qty,
                    product: newItem.product,
                    user: user.id,
                });
                prevCartItems.push(createdCartItem);
            }));
        }

        return prevCartItems
            .filter((i) => i.product)
            .map(({ id, qty, product }) => ({
                id,
                qty,
                product: {
                    ..._.omit(product, ['description', 'mainImage', 'images']),
                    images: [product.images[0]],
                },
            }))
            .map((entity) => sanitizeEntity(entity, { model: strapi.models.cart }));
    },
};
