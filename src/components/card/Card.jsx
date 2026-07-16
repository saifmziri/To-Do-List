import Task from "../task/Task";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../../features/tasks/taskSlice";
import { useToast } from "../../context/ToastContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faInbox } from "@fortawesome/free-solid-svg-icons";

const FILTERS = [
  { label: "All", value: "All" },
  { label: "Completed", value: "Completed" },
  { label: "Incomplete", value: "Incomplete" },
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

  const totalCount = taskData.length;
  const openCount = taskData.filter((t) => !t.isCompleted).length;
  const doneCount = totalCount - openCount;
  const completionPct = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);
  const activeIndex = FILTERS.findIndex((f) => f.value === statusBtn);

  return (
    <div className="bg-paper shadow-[0_1px_2px_rgba(11,18,32,0.04),0_16px_40px_-16px_rgba(11,18,32,0.18)] border border-border rounded-2xl p-8 w-full max-w-2xl h-700px flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            Task log
          </p>
          <h1 className="font-display mt-1 text-3xl font-bold text-ink tracking-tight">
            Task Manager
          </h1>
        </div>
        <div className="text-right">
          <p className="font-mono-data text-3xl font-semibold text-primary tabular-nums">
            {String(openCount).padStart(2, "0")}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
            {openCount === 1 ? "task open" : "tasks open"}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-1.5 w-full rounded-full bg-canvas overflow-hidden">
          <div
            className="h-full rounded-full bg-linear-to-r from-primary to-accent transition-all duration-500 ease-out"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-muted">
          <span>{completionPct}% complete</span>
          <span>
            {doneCount} of {totalCount} done
          </span>
        </div>
      </div>

      <hr className="w-full border-t border-border my-5" />

      <div className="relative flex items-center bg-canvas rounded-full p-1">
        <div
          className="absolute top-1 bottom-1 rounded-full bg-primary shadow-sm transition-transform duration-300 ease-out"
          style={{
            width: `calc(${100 / FILTERS.length}% - 4px)`,
            transform: `translateX(calc(${activeIndex} * (100% + 4px)))`,
            marginLeft: "2px",
          }}
        />
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setStatusBtn(filter.value)}
            className={`relative z-10 flex-1 px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-200
              ${statusBtn === filter.value ? "text-white" : "text-muted hover:text-ink"}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto my-5 pr-2">
        <div className="flex flex-col gap-2.5">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, i) => (
              <div
                key={task.id}
                className="task-enter"
                style={{ animationDelay: `${Math.min(i, 8) * 35}ms` }}
              >
                <Task todo={task} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-canvas text-muted">
                <FontAwesomeIcon icon={faInbox} size="lg" />
              </div>
              <p className="text-sm font-medium text-muted">No tasks found.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-5 border-t border-border">
        <input
          type="text"
          className="flex-1 border border-border bg-canvas/60 rounded-lg px-3.5 h-11 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/35 focus:border-accent transition-all duration-200"
          placeholder="Enter task title..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="flex items-center gap-1.5 bg-primary text-white text-sm font-semibold px-4 h-11 rounded-lg hover:bg-primary-deep active:scale-[0.97]
            transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer"
          onClick={handleAddTask}
          disabled={!taskTitle.trim()}
        >
          <FontAwesomeIcon icon={faPlus} size="sm" />
          Add Task
        </button>
      </div>
    </div>
  );
}