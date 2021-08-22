const { sanitizeEntity } = require('strapi-utils');


module.exports = {
    async find(ctx) {
        const { user } = ctx.state;

        const entity = await strapi.services.order.find({ ...ctx.query, user: user.id });
        return sanitizeEntity(entity, { model: strapi.models.order });
    },
    async findOne(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state;

        const entity = await strapi.services.order.findOne({ id, user: user.id });
        return sanitizeEntity(entity, { model: strapi.models.order });
    },

    async create(ctx) {
        const { body } = ctx.request;
        const { user } = ctx.state;

        const entity = await strapi.services.order.create({ ...body, user: user.id });
        await strapi.services.cart.delete({ id_in: body.carts });

        return sanitizeEntity(entity, { model: strapi.models.order });
    },

    async delete(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state;

        const entity = await strapi.services.order.delete({ id, user: user.id, status: 'draft' });

        return sanitizeEntity(entity, { model: strapi.models.order });
    },

    async confirm(ctx) {
        const { id } = ctx.params;

        await strapi.services.order.update({ id }, { status: 'processing' });
        return true;
    },
};

