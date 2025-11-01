import React from 'react';

type TodoContextType = {
  todos: TodoItem[];
  addTodo: (todo: TodoItem) => void;
  removeTodo: (index: number) => void;
};

export const TodoContext = React.createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);

  const addTodo = (todo: TodoItem) => {
    setTodos([...todos, todo]);
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
