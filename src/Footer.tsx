import { useTodoContext } from './contexts/todocontext';
const Footer = () => {
  const { todos } = useTodoContext();
  const categories = todos.filter((x) => x.category);
  const uniqueCategories = Array.from(
    new Set(categories.map((todo) => todo.category))
  );
  return (
    <div className="my-4 mr-4 flex justify-center">
      <h1 className="text-3xl">
        Total Categories - {uniqueCategories.length}
        {uniqueCategories.length === 1 ? ' category' : ' categories'}
      </h1>
    </div>
  );
};

export default Footer;
