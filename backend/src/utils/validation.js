const Joi = require('joi');

// User validation schemas
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 50 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password cannot exceed 100 characters',
    'any.required': 'Password is required'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  })
});

// Todo validation schemas
const createTodoSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().messages({
    'string.min': 'Title cannot be empty',
    'string.max': 'Title cannot exceed 100 characters',
    'any.required': 'Title is required'
  }),
  description: Joi.string().max(1000).optional().messages({
    'string.max': 'Description cannot exceed 1000 characters'
  }),
  priority: Joi.string().valid('low', 'medium', 'high').default('medium').messages({
    'any.only': 'Priority must be low, medium, or high'
  }),
  due_date: Joi.date().greater('now').optional().messages({
    'date.greater': 'Due date must be in the future'
  })
});

const updateTodoSchema = Joi.object({
  title: Joi.string().min(1).max(100).optional().messages({
    'string.min': 'Title cannot be empty',
    'string.max': 'Title cannot exceed 100 characters'
  }),
  description: Joi.string().max(1000).optional().messages({
    'string.max': 'Description cannot exceed 1000 characters'
  }),
  status: Joi.string().valid('pending', 'in_progress', 'completed').optional().messages({
    'any.only': 'Status must be pending, in_progress, or completed'
  }),
  priority: Joi.string().valid('low', 'medium', 'high').optional().messages({
    'any.only': 'Priority must be low, medium, or high'
  }),
  due_date: Joi.date().optional().messages({
    'date.base': 'Due date must be a valid date'
  })
});

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  createTodoSchema,
  updateTodoSchema,
  validate
}; 