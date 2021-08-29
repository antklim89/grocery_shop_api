module.exports = {
    definition: `#graphql
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
};
