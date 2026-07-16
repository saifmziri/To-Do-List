import "./App.css";
import Card from "./components/card/Card";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card />
      </div>
    </ToastProvider>
  );
}

export default App;
