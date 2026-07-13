import Task from "../task/Task";
import { useState, useContext, useMemo } from "react";
import { TaskDataContext } from "../../context/TaskDataContext";
import { useToast } from "../../context/ToastContext";

const FILTERS = [
  {
    label: "All",
    value: "All",
    activeClass: "bg-blue-500 border-blue-900 shadow-blue-500/50",
  },
  {
    label: "Completed",
    value: "Completed",
    activeClass: "bg-green-500 border-green-900 shadow-green-500/50",
  },
  {
    label: "Incomplete",
    value: "Incomplete",
    activeClass: "bg-red-500 border-red-900 shadow-red-500/50",
  },
];

export default function Card() {
  const [statusBtn, setStatusBtn] = useState("All");
  const { showToast } = useToast();
  const [taskTitle, setTaskTitle] = useState("");
  const { taskData, setTaskData } = useContext(TaskDataContext);

  // منطق الفلترة الاحترافي
  const filteredTasks = useMemo(() => {
    return taskData.filter((task) => {
      if (statusBtn === "Completed") return task.isCompleted;
      if (statusBtn === "Incomplete") return !task.isCompleted;
      return true; // All
    });
  }, [taskData, statusBtn]);

  function handleAddTask() {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle.trim(),
      description: "New task added.",
      isCompleted: false,
    };

    setTaskData((prev) => [...prev, newTask]);
    setTaskTitle("");
    showToast("Task added successfully!");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTask();
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl text-center scroll-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Task Manager</h1>
        <hr className="w-full border-t border-gray-300 my-2" />

        {/* أزرار الفلترة */}
        <div className="flex justify-center items-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusBtn(filter.value)}
              className={`px-4 py-2 rounded-md text-white border-2 cursor-pointer transition-all shadow-sm font-medium
                ${
                  statusBtn === filter.value
                    ? `${filter.activeClass} shadow-md scale-105`
                    : "bg-gray-400 border-transparent hover:bg-gray-500"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* عرض المهام المفلترة */}
        <div className="flex flex-col gap-3 my-4 overflow-y-auto p-1">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => <Task key={task.id} todo={task} />)
          ) : (
            <p className="text-gray-400 italic">No tasks found.</p>
          )}
        </div>

        {/* إضافة مهمة جديدة */}
        <div className="grid grid-cols-12 gap-4 mt-2">
          <button
            className="col-span-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            onClick={handleAddTask}
          >
            Add Task
          </button>
          <textarea
            className="col-span-8 border border-gray-300 rounded-md p-2 w-full focus:outline-blue-500 resize-none h-11"
            placeholder="Enter task title..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}
