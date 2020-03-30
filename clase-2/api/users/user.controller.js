'use strict';
const _ = require('underscore');
const generateId = require('../../utils/generateId.util');

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
const db = {
  users: [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        country: 'Neverland',
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      timezone: 'America/Montevideo',
    },
  ],
};

exports.getOne = ctx => {
  const { userId } = ctx.params;
  const user = db.users.find(user => user.id == userId);
  ctx.assert(user, 404, "The requested user doesn't exist");
  ctx.status = 200;
  ctx.body = user;
};

exports.getAll = async ctx => {
  ctx.status = 200;
  ctx.body = db.users;
};

exports.createOne = async ctx => {
  let user = ctx.request.body;
  ctx.assert(user, 400, 'The user info is malformed!');
  user.id = db.users.length + 1;
  db.users.push(user);
  let createdUser = db.users.find(u => u.id === user.id);
  ctx.status = 201;
  ctx.body = createdUser;
};

exports.editOne = async ctx => {
  let toModify = ctx.request.body;
  let userInDb = _.find(db.users, u => u.username === toModify.username);
  ctx.assert(userInDb, 400, 'The does not exist!');

  toModify.id = userInDb.id;
  db.users = _.reject(db.users, u => u.username === toModify.username);

  db.users.push(toModify);
  ctx.status = 203;
  ctx.body = toModify;
};


exports.deleteOne = async ctx =>{
  let todelte = ctx.request.body;
  db.users = _.reject(db.users, u => u.username === todelte.username);
  ctx.status = 200;
};
