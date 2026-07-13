import "./App.css";
import Card from "./components/card/Card";
import { useState, useEffect } from "react";
import { TaskDataContext } from "./context/TaskDataContext";

import { ToastProvider } from "./context/ToastContext";

function App() {
  // قراءة البيانات من الكاش فوراً عند تحميل التطبيق لمنع الـ Flash للبيانات القديمة
  const [taskData, setTaskData] = useState(() => {
    const storageData = localStorage.getItem("taskData");
    return storageData ? JSON.parse(storageData) : [];
  });

  // حفظ مركزي وحيد لكل التطبيق
  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(taskData));
  }, [taskData]);

  return (
    <ToastProvider>
      <TaskDataContext.Provider value={{ taskData, setTaskData }}>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <Card />
        </div>
      </TaskDataContext.Provider>
    </ToastProvider>
  );
}

export default App;
