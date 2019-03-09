const Todo = require('./../config/db.config').Todo;
const TodoResponseDto = require('./../dtos/responses/todos/todo.dto');
const GenericResponseDto = require("../dtos/responses/shared/generic.dto");


exports.getAll = (req, res, next) => {
    Todo.query('orderBy', 'created_at', 'DESC').fetchAll({
        debug: process.env.DEBUG,
        columns: ['id', 'title', 'completed', 'created_at', 'updated_at']
    }).then(todos => {
        return res.json(TodoResponseDto.buildDtos(todos.serialize()));
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};


exports.getCompleted = (req, res, next) => {
    Todo.query(queryBuilder => {
        queryBuilder.orderBy('created_at', 'DESC');
        queryBuilder.where('completed', '=', false)
    }).fetchAll({
        debug: process.env.DEBUG,
        columns: ['id', 'title', 'completed', 'created_at', 'updated_at']
    }).then(todos => {
        return res.json(TodoResponseDto.buildDtos(todos.serialize()));
    }).catch(err => {
        throw res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.getPending = (req, res, next) => {
    Todo.query(queryBuilder => {
        queryBuilder.orderBy('created_at', 'DESC');
        queryBuilder.where('completed', '=', false)
    }).fetchAll({
        debug: process.env.DEBUG,
        columns: ['id', 'title', 'completed', 'created_at', 'updated_at']
    }).then(todos => {
        return res.json(TodoResponseDto.buildDtos(todos.serialize()));
    }).catch(err => {
        throw res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.getById = (req, res, next) => {
    Todo.where('id', req.params.id).fetch({
        debug: process.env.DEBUG || true,
    }).then(todo => {
        if (todo == null)
            return res.status(404).json(GenericResponseDto.buildWithErrorMessages('Todo not found'));
        return res.json(TodoResponseDto.buildDetails(todo.toJSON()));
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.create = function (req, res, next) {
    const {title, description, completed} = req.body;
    Todo.create({title, description, completed}).then(todo => {
        return res.status(201).json(TodoResponseDto.buildDetails(todo.toJSON()));
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.update = function (req, res, next) {

    Todo.where({id: req.params.id}).fetch({debug: process.env.DEBUG}).then(todo => {
        if (todo == null)
            return res.status(404).json(GenericResponseDto.buildWithErrorMessages('Todo not found'));
        const {title, description, completed} = req.body;

        todo.set('title', title);

        if (description != null)
            todo.set('description', description);

        todo.set('completed', completed ? 1 : 0); // bookshelf interprets booleans as 1 or 0, to update successfully use 0 or 1

        todo.save().then(todo => {
            return res.json(TodoResponseDto.buildDetails(todo.serialize()));
        }).catch(err => {
            return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
        });
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};

exports.delete = function (req, res, next) {
    // Todo.where('id', req.params.id).destroy().then(result => {
    Todo.where({id: req.params.id}).fetch({debug: process.env.DEBUG}).then(todo => {
        if (todo == null)
            return res.status(404).json(GenericResponseDto.buildWithErrorMessages('Todo not found'));
        // I show you this way because it is most likely in a real world app you would need to make some
        // checks first with te destroyed model.
        todo.destroy().then(result => {
            return res.status(204).send();
        }).catch(err => {
            return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
        });
    });
};

exports.deleteAll = function (req, res, next) {
    Todo.where('id', '!=', 0).destroy({debug: process.env.DEBUG}).then(result => {
        return res.status(204).send();
    }).catch(err => {
        return res.json(GenericResponseDto.buildWithErrorMessages(err.message));
    });
};


