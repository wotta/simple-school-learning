module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '147437602ea52ea22e20b5630a591079'),
  },
});
