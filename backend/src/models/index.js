const User = require('./User');
const Todo = require('./Todo');

// Define associations
User.hasMany(Todo, {
  foreignKey: 'user_id',
  as: 'todos',
  onDelete: 'CASCADE'
});

Todo.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

module.exports = {
  User,
  Todo
}; 