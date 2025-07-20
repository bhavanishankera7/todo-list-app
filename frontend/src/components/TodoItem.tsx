import React, { useState } from 'react';
import type { Todo } from '../types';
import { Edit, Trash2, CheckCircle, Clock, AlertCircle, Calendar, Flag } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, updates: Partial<Todo>) => void;
  onDelete: (id: number) => void;
  onStatusUpdate: (id: number, status: 'pending' | 'in_progress' | 'completed') => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete, onStatusUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
    });
    setIsEditing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="input-field font-medium text-lg"
                placeholder="Todo title"
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="input-field resize-none"
                rows={3}
                placeholder="Description (optional)"
              />
              <div className="flex items-center space-x-4">
                <select
                  value={editData.priority}
                  onChange={(e) => setEditData({ ...editData, priority: e.target.value as any })}
                  className="input-field w-auto"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="btn-primary text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">{todo.title}</h3>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(todo.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(todo.status)}`}>
                    {todo.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              {todo.description && (
                <p className="text-gray-600 mb-3">{todo.description}</p>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Flag className="h-4 w-4" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                    {todo.priority} priority
                  </span>
                </div>
                {todo.due_date && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(todo.due_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {!isEditing && (
          <div className="flex items-center space-x-2 ml-4">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => onStatusUpdate(todo.id, 'pending')}
                className={`p-1 rounded ${todo.status === 'pending' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
                title="Mark as Pending"
              >
                <Clock className="h-4 w-4" />
              </button>
              <button
                onClick={() => onStatusUpdate(todo.id, 'in_progress')}
                className={`p-1 rounded ${todo.status === 'in_progress' ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:text-yellow-600'}`}
                title="Mark as In Progress"
              >
                <AlertCircle className="h-4 w-4" />
              </button>
              <button
                onClick={() => onStatusUpdate(todo.id, 'completed')}
                className={`p-1 rounded ${todo.status === 'completed' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                title="Mark as Completed"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col space-y-1">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-blue-600 rounded"
                title="Edit Todo"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 text-gray-400 hover:text-red-600 rounded"
                title="Delete Todo"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem; 