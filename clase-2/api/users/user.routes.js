'use strict';

const controller = require('./user.controller');

module.exports = Router => {
  const router = new Router({
    prefix: `/users`,
  });

  router
    .get('/:userId', controller.getOne)
    .get('/', controller.getAll)
    .post('/', controller.createOne)
    .put('/', controller.editOne)
    .delete('/', controller.deleteOne);

  return router;
};
