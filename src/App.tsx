import { TodoProvider } from './contexts/todocontext';
import Footer from './Footer';
import Header from './Header';
import ToDoBody from './ToDoBody';

function App() {
  return (
    <TodoProvider>
      <div className="flex flex-col justify-between min-h-screen">
        <Header />
        <ToDoBody />
        <Footer />
      </div>
    </TodoProvider>
  );
}

export default App;
