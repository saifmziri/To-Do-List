import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useTaskData } from "../../context/TaskDataContext";
import Confirm from "./../../confirm/Confirm";
import UpdateModal from "./../../UpdateModalTask/UpdateModal";
import { useToast } from "../../context/ToastContext";

export default function Task({ todo }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { showToast } = useToast();
  const { dispatch } = useTaskData();

  function handleCheckClick() {
    const newStatus = !todo.isCompleted;

    dispatch({ type: "TOGGLE_TASK", payload: { id: todo.id } });

    showToast(
      newStatus ? "Task completed successfully!" : "Task marked as incomplete.",
      newStatus ? "success" : "error",
    );
  }

  function handleConfirmDelete() {
    dispatch({ type: "DELETE_TASK", payload: { id: todo.id } });
    setShowConfirm(false);
    showToast("Task deleted.", "error");
  }

  function handleConfirmUpdate(updatedTitle, updatedDescription) {
    dispatch({
      type: "UPDATE_TASK",
      payload: {
        id: todo.id,
        title: updatedTitle,
        description: updatedDescription,
      },
    });
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
        className={`flex flex-row-reverse items-center justify-between text-white rounded-md p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]
          hover:shadow-xl ${todo.isCompleted ? "bg-gray-500 line-through opacity-70" : "bg-amber-900"}`}
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
