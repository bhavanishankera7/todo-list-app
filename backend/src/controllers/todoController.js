const { Todo } = require('../models');

// Get all todos for a user
const getAllTodos = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await Todo.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });

    res.json({
      todos
    });
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({
      error: 'Failed to get todos',
      message: error.message
    });
  }
};

// Get a specific todo
const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const todo = await Todo.findOne({
      where: { id, user_id: userId }
    });

    if (!todo) {
      return res.status(404).json({
        error: 'Todo not found'
      });
    }

    res.json({
      todo
    });
  } catch (error) {
    console.error('Get todo error:', error);
    res.status(500).json({
      error: 'Failed to get todo',
      message: error.message
    });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, priority, due_date } = req.body;

    const todo = await Todo.create({
      title,
      description,
      priority,
      due_date,
      user_id: userId
    });

    res.status(201).json({
      message: 'Todo created successfully',
      todo
    });
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({
      error: 'Failed to create todo',
      message: error.message
    });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    const todo = await Todo.findOne({
      where: { id, user_id: userId }
    });

    if (!todo) {
      return res.status(404).json({
        error: 'Todo not found'
      });
    }

    await todo.update(updateData);

    res.json({
      message: 'Todo updated successfully',
      todo
    });
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({
      error: 'Failed to update todo',
      message: error.message
    });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const todo = await Todo.findOne({
      where: { id, user_id: userId }
    });

    if (!todo) {
      return res.status(404).json({
        error: 'Todo not found'
      });
    }

    await todo.destroy();

    res.json({
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({
      error: 'Failed to delete todo',
      message: error.message
    });
  }
};

// Update todo status
const updateTodoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const todo = await Todo.findOne({
      where: { id, user_id: userId }
    });

    if (!todo) {
      return res.status(404).json({
        error: 'Todo not found'
      });
    }

    await todo.update({ status });

    res.json({
      message: 'Todo status updated successfully',
      todo
    });
  } catch (error) {
    console.error('Update todo status error:', error);
    res.status(500).json({
      error: 'Failed to update todo status',
      message: error.message
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatus
}; 