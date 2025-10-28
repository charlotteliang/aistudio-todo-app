
import React from 'react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="group flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
      <div className="flex items-center">
        <input
          id={`todo-${todo.id}`}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-6 w-6 rounded-full border-gray-300 dark:border-gray-600 text-primary focus:ring-primary dark:bg-gray-800 transition duration-150 ease-in-out cursor-pointer"
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={`ml-4 text-lg cursor-pointer ${
            todo.completed
              ? 'text-gray-400 dark:text-gray-500 line-through'
              : 'text-gray-800 dark:text-gray-200'
          } transition-all duration-300`}
        >
          {todo.text}
        </label>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 focus:outline-none"
        aria-label={`Delete todo: ${todo.text}`}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
};

export default TodoItem;
