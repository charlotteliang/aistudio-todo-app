
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Todo, FilterType } from './types';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterControls from './components/FilterControls';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const items = window.localStorage.getItem('todos');
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  });

  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

  useEffect(() => {
    try {
      window.localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    if (text.trim() === '') return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FilterType.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterType.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);
  const completedCount = useMemo(() => todos.length - activeCount, [todos, activeCount]);

  return (
    <div className="min-h-screen font-sans text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-xl mx-auto">
        <Header />
        <main className="bg-white dark:bg-gray-800 rounded-lg shadow-custom overflow-hidden mt-8">
          <TodoInput onAddTodo={addTodo} />
          <TodoList todos={filteredTodos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} />
          {todos.length > 0 && (
             <FilterControls 
                filter={filter}
                setFilter={setFilter}
                activeCount={activeCount}
                completedCount={completedCount}
                onClearCompleted={clearCompleted}
             />
          )}
        </main>
        <footer className="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm">
          <p>Drag and drop to reorder list (not implemented)</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
