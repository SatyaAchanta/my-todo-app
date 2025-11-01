import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTodoContext } from './contexts/todocontext';
import ToDoListItem from './ToDoListItem';

const TodoList = () => {
  const { todos, removeTodo } = useTodoContext();

  const handleDeleteTodo = (index: number) => {
    removeTodo(index);
  };

  return (
    <div className="flex-1">
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" className="mb-4">
            Todo List ({todos.length})
          </Typography>
          {todos.length === 0 ? (
            <Box className="text-center py-8">
              <Typography variant="body2" color="text.secondary">
                No todos yet. Add one to get started!
              </Typography>
            </Box>
          ) : (
            <List className="max-h-96 overflow-y-auto">
              {todos.map((todo, index) => (
                <ListItem
                  key={index}
                  className="border-b border-gray-100 last:border-b-0"
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTodo(index)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  <ToDoListItem item={todo.item} category={todo.category} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoList;
