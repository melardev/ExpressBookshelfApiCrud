// This shows how to use Bookshelf API to seed instead of knex

const faker = require('faker');
const Todo = require('../config/db.config').Todo;
Todo.query().count('* as todoCount')
    .then(async result => {
        const todosCount = result[0]['todoCount'];
        console.log('[+] There are ' + todosCount + ' todos in the database');
        let todosToSeed = 45;
        todosToSeed -= todosCount;

        if (todosToSeed <= 0)
            return;

        console.log('[+] Seeding ' + todosToSeed + ' in the database');
        const todos = [];
        for (let i = 0; i < todosToSeed; i++) {
            await Todo.create({
                title: faker.lorem.words(faker.random.number({min: 2, max: 5})),
                // you can also use faker.lorem.text()
                description: faker.lorem.sentences(faker.random.number({min: 5, max: 10})),
                completed: faker.random.boolean() && faker.random.boolean() // make it harder to be true
            });
        }

        process.exit(0);
    }).catch(err => {
    throw err;
    process.exit(0);
});

