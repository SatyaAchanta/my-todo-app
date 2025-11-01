import { useTodoContext } from './contexts/todocontext';

type TodoItemsByCategories = {
  [key: string]: string[];
};

const ToDoCategories = () => {
  const { todos } = useTodoContext();
  const categories: string[] = Array.from(
    new Set(todos.map((x) => x.category))
  );

  const itemsByCategories: TodoItemsByCategories = {};

  categories.forEach((c) => {
    if (!itemsByCategories[c]) {
      itemsByCategories[c] = [];
    }
  });

  todos.forEach((x) => {
    if (itemsByCategories[x.category]) {
      itemsByCategories[x.category].push(x.item);
    }
  });

  return (
    <div>
      <h1 className="text-3xl my-4 mr-4 flex justify-center">
        Items By Categories
      </h1>
      {itemsByCategories && Object.keys(itemsByCategories).length > 0 ? (
        <div className="mx-4">
          {Object.entries(itemsByCategories).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                {category} ({items.length})
              </h2>
              <ul className="list-disc list-inside">
                {items.map((item, index) => (
                  <li key={index} className="text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No categories available.</p>
      )}
    </div>
  );
};

export default ToDoCategories;
