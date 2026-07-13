import "./App.css";
import Card from "./components/card/Card";
import { useState, useEffect } from "react";
import { TaskDataContext } from "./context/TaskDataContext";

const DEFAULT_TASKS = [
  {
    id: 1,
    title: "Sample Task",
    description: "lorem ipsum dolor sit amet...",
    isCompleted: false,
  },
  {
    id: 2,
    title: "OOP function",
    description: "We are learning about OOP functions in JavaScript.",
    isCompleted: true,
  },
  {
    id: 3,
    title: "Frontend Development",
    description: "We are learning about frontend development.",
    isCompleted: false,
  },
];

function App() {
  // قراءة البيانات من الكاش فوراً عند تحميل التطبيق لمنع الـ Flash للبيانات القديمة
  const [taskData, setTaskData] = useState(() => {
    const storageData = localStorage.getItem("taskData");
    return storageData ? JSON.parse(storageData) : DEFAULT_TASKS;
  });

  // حفظ مركزي وحيد لكل التطبيق
  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(taskData));
  }, [taskData]);

  return (
    <TaskDataContext.Provider value={{ taskData, setTaskData }}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <Card />
      </div>
    </TaskDataContext.Provider>
  );
}

export default App;
