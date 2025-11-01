import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTodoContext } from './contexts/todocontext';

const AddTodoForm = () => {
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const { addTodo } = useTodoContext();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() && newCategory.trim()) {
      addTodo({
        category: newCategory.trim(),
        item: newTodo.trim(),
      });
      setNewTodo('');
      setNewCategory('');
    }
  };

  return (
    <div className="flex-1">
      <Card className="h-fit">
        <CardContent>
          <Typography variant="h6" component="h2" className="mb-4">
            Add New Todo
          </Typography>
          <form onSubmit={handleAddTodo} className="space-y-4">
            <TextField
              fullWidth
              label="Enter a category"
              variant="outlined"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="What needs to be done?"
            />
            <TextField
              fullWidth
              label="Enter a new todo"
              variant="outlined"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
            />
            <Button
              type="submit"
              variant="contained"
              startIcon={<Add />}
              fullWidth
              className="mt-4"
              disabled={!newTodo.trim()}
            >
              Add Todo
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTodoForm;
