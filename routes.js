const express = require('express');

function listRoutes(app) {
  const router = express.Router();

  router.get('/routes', (req, res) => {
    const routes = [];

    app._router.stack.forEach((middleware) => {
      if (middleware.route) { // Ruta directa
        routes.push({
          method: Object.keys(middleware.route.methods)[0].toUpperCase(),
          path: middleware.route.path,
        });
      } else if (middleware.name === 'router') { // Subrutas (router-level middleware)
        const subRouterPath = middleware.regexp.source.replace("^\\/", "").replace("\\/", "/").replace("\\/?(?=\\/|$)", "");
        middleware.handle.stack.forEach((handler) => {
          if (handler.route) {
            routes.push({
              method: Object.keys(handler.route.methods)[0].toUpperCase(),
              path: `/${subRouterPath}${handler.route.path}`,
            });
          }
        });
      }
    });

    res.json(routes);
  });

  return router;
}

module.exports = listRoutes;
