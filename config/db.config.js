const db = {};
const mode = process.env.MODE || 'development';
db.knex = require('knex')(require('../knexfile')[mode]);

db.bookshelf = require('bookshelf')(db.knex);

db.bookshelf.plugin('pagination');
db.ModelBase = require('bookshelf-modelbase')(db.bookshelf);

db.Todo = require('./../models/todo.model')(db);

module.exports = db;