import { ListItemText, Chip } from '@mui/material';

const ToDoListItem = ({ item, category }: TodoItem) => {
  return (
    <div>
      <ListItemText primary={item} className="pr-4" />
      <Chip label={category} />
    </div>
  );
};

export default ToDoListItem;
