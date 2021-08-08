module.exports = {
    definition: `
        extend type UsersPermissionsMe {
            profile: Profile
        }
    `,
    resolver: {
        UsersPermissionsMe: {
            profile: ({ profile }) => strapi.services.profile.findOne({ id: profile }),
        },
    },
};
