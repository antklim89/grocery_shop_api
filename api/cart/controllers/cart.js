'use strict';

const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
        const { user } = ctx.state;

        const entities = ctx.query._q
            ? await strapi.services.cart.search({...ctx.query, user: user.id})
            : await strapi.services.cart.find({...ctx.query, user: user.id});

        return entities.map((entity) => sanitizeEntity(entity, { model: strapi.models.cart }))
    },

    async findOne(ctx) {
        const { id } = ctx.params;
        const { user } = ctx.state;
    
        const entity = await strapi.services.cart.findOne({ id, user: user.id });
        return sanitizeEntity(entity, { model: strapi.models.cart });
    },

    async create(ctx) {
        const entity = await strapi.services.cart.create({
          ...ctx.request.body,
          user: ctx.state.user.id,
        });
        return sanitizeEntity(entity, { model: strapi.models.cart });
      },
};
