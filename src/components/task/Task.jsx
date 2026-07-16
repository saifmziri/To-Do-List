import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask, updateTask } from "../../features/tasks/taskSlice";
import Confirm from "./../../confirm/Confirm";
import UpdateModal from "./../../UpdateModalTask/UpdateModal";
import { useToast } from "../../context/ToastContext";

export default function Task({ todo }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { showToast } = useToast();
  const dispatch = useDispatch();

  function handleCheckClick() {
    const newStatus = !todo.isCompleted;

    dispatch(toggleTask({ id: todo.id }));

    showToast(
      newStatus ? "Task completed successfully!" : "Task marked as incomplete.",
      newStatus ? "success" : "error",
    );
  }

  function handleConfirmDelete() {
    dispatch(deleteTask({ id: todo.id }));
    setShowConfirm(false);
    showToast("Task deleted.", "error");
  }

  function handleConfirmUpdate(updatedTitle, updatedDescription) {
    dispatch(
      updateTask({
        id: todo.id,
        title: updatedTitle,
        description: updatedDescription,
      }),
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
        className={`group relative flex items-center justify-between rounded-lg pl-5 pr-4 py-4 border transition-all duration-200
          ${
            todo.isCompleted
              ? "bg-canvas/60 border-border opacity-70"
              : "bg-paper border-border hover:border-primary/30 hover:shadow-[0_8px_20px_-12px_rgba(11,18,32,0.25)] hover:-translate-y-0.5"
          }`}
      >
        <span
          className={`absolute left-0 top-0 h-full w-1 rounded-l-lg transition-colors duration-200 ${
            todo.isCompleted ? "bg-success" : "bg-primary"
          }`}
        />

        <div className="min-w-0">
          <h2
            className={`text-[15px] font-semibold text-ink truncate ${
              todo.isCompleted ? "line-through decoration-muted" : ""
            }`}
          >
            {todo.title}
          </h2>
          {todo.description ? (
            <p
              className={`text-sm text-muted mt-0.5 ${
                todo.isCompleted ? "line-through decoration-border" : ""
              }`}
            >
              {todo.description}
            </p>
          ) : null}
        </div>

        <div className="flex gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleCheckClick}
            className={`rounded-md p-2 text-white transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer
              ${todo.isCompleted ? "bg-success hover:bg-success-deep" : "bg-success/85 hover:bg-success"}`}
            aria-label="Toggle Complete task"
          >
            <FontAwesomeIcon icon={faCheckDouble} size="sm" />
          </button>

          <button
            type="button"
            onClick={() => setShowUpdateModal(true)}
            className="rounded-md bg-primary p-2 text-white transition-all duration-150 hover:bg-primary-deep hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Edit task"
          >
            <FontAwesomeIcon icon={faPenToSquare} size="sm" />
          </button>

          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="rounded-md bg-danger p-2 text-white transition-all duration-150 hover:bg-danger-deep hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Delete task"
          >
            <FontAwesomeIcon icon={faXmark} size="sm" />
          </button>
        </div>
      </div>
    </>
  );
}