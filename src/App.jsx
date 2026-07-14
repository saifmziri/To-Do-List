import "./App.css";
import Card from "./components/card/Card";
import { TaskDataProvider } from "./context/TaskDataContext";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <TaskDataProvider>
      <ToastProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <Card />
        </div>
      </ToastProvider>
    </TaskDataProvider>
  );
}

export default App;
