const { sanitizeEntity } = require('strapi-utils');


const MINUTES_15 = 1000 * 60 * 15;

module.exports = {
    async find(ctx) {
        const { user } = ctx.state;
        const expireDate = Date.now() - MINUTES_15;

        const entities = await strapi.services.order.find({ ...ctx.query, user: user.id });

        return entities
            .filter((entity) => !(entity.status === 'draft' && entity.created_at.getTime() < expireDate))
            .map((entity) => sanitizeEntity(entity, { model: strapi.models.order }));
    },
    async findOne(ctx) {
        const { id: uid } = ctx.params;
        const { user } = ctx.state;
        const expireDate = Date.now() - MINUTES_15;

        const entity = await strapi.services.order.findOne({ uid, user: user.id });
        if (entity && entity.status === 'draft' && entity.created_at.getTime() < expireDate) {
            throw new Error('The order time has expired.');
        }
        return sanitizeEntity(entity, { model: strapi.models.order });
    },

    async create(ctx) {
        const { body } = ctx.request;
        const { user } = ctx.state;

        const cartItems = await strapi.services.cart.find({ inOrder: true, user: user.id });
        const orderedProducts = cartItems.map(({ qty, product }) => ({ qty, product: product.id }));
        if (orderedProducts.length === 0) return ctx.throw('No products in cart.');

        const entity = await strapi.services.order.create({ ...body, user: user.id, orderedProducts });

        return sanitizeEntity(entity, { model: strapi.models.order });
    },

    async delete(ctx) {
        const { id: uid } = ctx.params;
        const { user } = ctx.state;

        const entity = await strapi.services.order.delete({ uid, user: user.id, status: 'draft' });

        return sanitizeEntity(entity, { model: strapi.models.order });
    },

    async confirm(ctx) {
        const { id: uid } = ctx.params;
        const { user } = ctx.state;

        await strapi.services.order.update({ uid }, { status: 'processing' });
        await strapi.services.cart.delete({ inOrder: true, user: user.id });
        return true;
    },
};
