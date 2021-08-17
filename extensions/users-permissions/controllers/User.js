const origController = require('strapi-plugin-users-permissions/controllers/User');


module.exports = {
    async update(ctx) {
        const { isAuthenticatedAdmin } = ctx.state;
        const { body } = ctx.request;
        const { user } = ctx.state;

        if (isAuthenticatedAdmin) {
            return origController.update(ctx);
        }

        ctx.params.id = user.id;

        if ('password' in body) {
            if (strapi.plugins['users-permissions'].services.user.isHashed(body.password)) {
                throw new Error('Your password cannot contain more than three times the symbol `$`.');
            }
            if (!body.oldPassword) {
                throw new Error('Old password is required.');
            }
            const validPassword = await strapi.plugins['users-permissions']
                .services.user.validatePassword(body.oldPassword, user.password);

            if (!validPassword) {
                throw new Error('The new and old passwords do not match.');
            }
        }

        return origController.update(ctx);
    },
};
