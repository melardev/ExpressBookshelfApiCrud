const faker = require('faker');
exports.seed = function (knex, Promise) {

    return knex('todos').count()
        .then(result => {
            // when count('id') then -> result[0]['count(`id`)']
            const todosCount = result[0]['count(*)'];
            console.log('[+] There are ' + todosCount + ' todos in the database');
            let todosToSeed = 43;
            todosToSeed -= todosCount;


            if (todosToSeed <= 0)
                return;

            console.log('[+] Seeding ' + todosToSeed + ' in the database');
            const todos = [];
            for (let i = 0; i < todosToSeed; i++) {
                todos.push({
                    title: faker.lorem.words(faker.random.number({min: 2, max: 5})),
                    // you can also use faker.lorem.text()
                    description: faker.lorem.sentences(faker.random.number({min: 5, max: 10})),
                    completed: faker.random.boolean() && faker.random.boolean() // make it harder to be true
                });
            }
            const tableName = 'todos';
            return knex(tableName).insert(todos);
        });
};
