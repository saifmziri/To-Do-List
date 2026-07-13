import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { TaskDataContext } from "../../context/TaskDataContext";
import Confirm from "./../../confirm/Confirm";
import UpdateModal from "./../../UpdateModalTask/UpdateModal";
import { useToast } from "../../context/ToastContext"; // Import the custom hook

export default function Task({ todo }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { showToast } = useToast();
  const { setTaskData } = useContext(TaskDataContext);

  function handleCheckClick() {
    const newStatus = !todo.isCompleted;

    setTaskData((prev) =>
      prev.map((task) =>
        task.id === todo.id ? { ...task, isCompleted: newStatus } : task,
      ),
    );

    showToast(
      newStatus ? "Task completed successfully!" : "Task marked as incomplete.",
      newStatus ? "success" : "error",
    );
  }
  function handleConfirmDelete() {
    setTaskData((prev) => prev.filter((task) => task.id !== todo.id));
    setShowConfirm(false);
    showToast("Task deleted.", "error");
  }

  function handleConfirmUpdate(updatedTitle, updatedDescription) {
    setTaskData((prev) =>
      prev.map((task) =>
        task.id === todo.id
          ? { ...task, title: updatedTitle, description: updatedDescription }
          : task,
      ),
    );
    setShowUpdateModal(false);
    showToast("Task updated successfully!");
  }

  return (
    <>
      {showConfirm && (
        <Confirm
          title="Delete Task"
          description="Are you sure you want to delete this task?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {showUpdateModal && (
        <UpdateModal
          title="Update Task"
          titleTask={todo.title}
          description={todo.description}
          onConfirm={handleConfirmUpdate}
          onCancel={() => setShowUpdateModal(false)}
        />
      )}

      <div
        className={`flex flex-row-reverse items-center justify-between text-white rounded-md p-4 transition-all duration-300
        ${todo.isCompleted ? "bg-gray-500 line-through opacity-70" : "bg-amber-900"}`}
      >
        {/* النصوص */}
        <div className="text-right">
          <h2 className="text-xl font-bold">{todo.title}</h2>
          <p className="text-gray-300 text-sm mt-1">{todo.description}</p>
        </div>

        {/* الأزرار */}
        <div className="flex flex-row-reverse gap-2">
          <button
            type="button"
            onClick={handleCheckClick}
            className={`rounded-md p-2 text-white transition-colors cursor-pointer 
              ${todo.isCompleted ? "bg-green-700 hover:bg-green-800" : "bg-green-500 hover:bg-green-600"}`}
            aria-label="Toggle Complete task"
          >
            <FontAwesomeIcon icon={faCheckDouble} />
          </button>

          <button
            type="button"
            onClick={() => setShowUpdateModal(true)}
            className="rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600 cursor-pointer"
            aria-label="Edit task"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>

          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="rounded-md bg-red-500 p-2 text-white transition-colors hover:bg-red-600 cursor-pointer"
            aria-label="Delete task"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </>
  );
}
