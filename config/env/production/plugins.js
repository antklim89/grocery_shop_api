/* eslint-disable camelcase */
module.exports = ({ env }) => ({
    upload: {
        provider: 'uploadcare',
        providerOptions: {
            public_key: env('UPLOADCARE_PUBLIC_KEY'),
            secret_key: env('UPLOADCARE_SECRET_KEY'),
        },
    },
});
