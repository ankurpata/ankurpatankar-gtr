const express = require('express');
const getirRoute = require('./getir.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/getir',
    route: getirRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/getir',
    route: getirRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
