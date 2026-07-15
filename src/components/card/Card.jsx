import Task from "../task/Task";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../features/tasks/taskSlice";
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

  const taskData = useSelector((state) => {
    return state.tasks.tasks;
  });
  const dispatch = useDispatch();

  const filteredTasks = useMemo(() => {
    return taskData
      .filter((task) => {
        if (statusBtn === "Completed") return task.isCompleted;
        if (statusBtn === "Incomplete") return !task.isCompleted;
        return true;
      })
      .toSorted((a, b) => b.id - a.id);
  }, [taskData, statusBtn]);

  function handleAddTask() {
    if (!taskTitle.trim()) return;

    dispatch(addTask({ taskTitle }));
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
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl h-175 flex flex-col">
      <h1 className="text-4xl font-bold text-gray-800 text-center">
        Task Manager
      </h1>
      <hr className="w-full border-t border-gray-300 my-4" />

      <div className="flex justify-center items-center gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatusBtn(filter.value)}
            className={`px-4 py-2 rounded-md text-white border-2 cursor-pointer transition-all
              ${statusBtn === filter.value ? `${filter.activeClass} shadow-md scale-105` : "bg-gray-400 hover:bg-gray-500"}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto my-4 pr-2">
        <div className="flex flex-col gap-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => <Task key={task.id} todo={task} />)
          ) : (
            <p className="text-gray-400 italic text-center">No tasks found.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 pt-4 border-t border-gray-200">
        <button
          className="col-span-4 bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleAddTask}
        >
          Add Task
        </button>

        <input
          type="text"
          className="col-span-8 border border-gray-300 rounded-md p-2 h-11 focus:outline-blue-500"
          placeholder="Enter task title..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
