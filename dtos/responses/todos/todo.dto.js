function buildDtos(todos) {
    return todos.map(todo => buildDto(todo));
}

function buildDto(todo, includeDescription = false) {
    const dto = {
        id: todo.id,
        title: todo.title,
        completed: todo.completed === 1,
    };

    if (includeDescription)
        dto.desription = todo.description;

    dto.created_at = todo.created_at;
    dto.updated_at = todo.updated_at;
    return dto;
}

function buildDetails(todo) {
    return buildDto(todo, true);
}

module.exports = {
     buildDtos, buildDetails, buildDto
};
