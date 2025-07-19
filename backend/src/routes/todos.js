const express = require('express');
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatus
} = require('../controllers/todoController');
const { validate, createTodoSchema, updateTodoSchema } = require('../utils/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all todos for user
router.get('/', getAllTodos);

// Get specific todo
router.get('/:id', getTodoById);

// Create new todo
router.post('/', validate(createTodoSchema), createTodo);

// Update todo
router.put('/:id', validate(updateTodoSchema), updateTodo);

// Delete todo
router.delete('/:id', deleteTodo);

// Update todo status
router.patch('/:id/status', updateTodoStatus);

module.exports = router; 