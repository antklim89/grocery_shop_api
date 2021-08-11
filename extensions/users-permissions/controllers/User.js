const { sanitizeEntity } = require('strapi-utils');


module.exports = {
    async update(ctx) {
        const { body } = ctx.request;
        const { user } = ctx.state;

        const entity = await strapi.query('user', 'users-permissions').update({ id: user.id }, body);
        if (!entity) return ctx.badRequest(null, 'Not Auth.');


        return ctx.send(
            sanitizeEntity(entity, { model: strapi.query('user', 'users-permissions').model }),
        );
    },


};
