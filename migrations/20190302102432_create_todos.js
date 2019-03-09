exports.up = function (knex, Promise) {
    return knex.schema.createTable('todos', table => {
        table.increments();

        table.string('title').notNullable();
        table.text('description').notNullable();
        table.boolean('completed');

        table.timestamps(false, true);
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('todos');
};
