import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import ToDoCategories from './ToDoCategories';

const ToDoBody = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto">
      {/* Left Section - Add Todo Form */}
      <AddTodoForm />

      {/* Right Section - Todo List */}
      <TodoList />

      <ToDoCategories />
    </div>
  );
};

export default ToDoBody;
