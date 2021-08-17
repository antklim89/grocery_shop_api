module.exports = {
    definition: `
        extend type UsersPermissionsMe {
            name: String
            surname: String
            phone: String
            address: String
        }
        extend input editUserInput {
            oldPassword: String
        }
    `,
    resolver: {
        UsersPermissionsMe: {
            name: (user) => user.name,
            surname: (user) => user.surname,
            phone: (user) => user.phone,
            address: (user) => user.address,
        },
    },
};
