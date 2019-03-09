module.exports = function (db) {
    return db.ModelBase.extend({
        tableName: 'todos',
    });
};