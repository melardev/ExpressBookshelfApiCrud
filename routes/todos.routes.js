const todosController = require('../controllers/todos.controller');
const router = require('express').Router();


router.get('', todosController.getAll);
router.get('/completed', todosController.getCompleted);
router.get('/pending', todosController.getPending);

router.get('/:id', todosController.getById);

router.post('', todosController.create);
router.put('/:id', todosController.update);
router.delete('/:id', todosController.delete);
router.delete('', todosController.deleteAll);

module.exports = router;
