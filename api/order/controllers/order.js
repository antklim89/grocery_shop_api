const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const entity = await strapi.services.order.findOne({ id, user: user.id });
    return sanitizeEntity(entity, { model: strapi.models.order });
  },

  async create(ctx) {
    console.debug('||ctx.request.body: \n', ctx.request.body);
    const entity = await strapi.services.order.create({
      ...ctx.request.body,
      user: ctx.state.user.id,
      uid: Math.random().toString(32),
    });
    return sanitizeEntity(entity, { model: strapi.models.order });
  },
};
 