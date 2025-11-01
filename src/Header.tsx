import { Button } from '@mui/material';
import { useTodoContext } from './contexts/todocontext';

const Header = () => {
  const { todos, addTodo, removeTodo } = useTodoContext();
  return (
    <div className="my-4 mr-4 flex justify-center">
      <h1 className="text-5xl">
        My Todo App - {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
      </h1>
    </div>
  );
};

export default Header;
