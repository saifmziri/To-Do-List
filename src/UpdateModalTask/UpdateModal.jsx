import { useState } from "react";
import { createPortal } from "react-dom";

export default function UpdateModal({
  title,
  titleTask,
  description,
  onConfirm,
  onCancel,
}) {
  const [updatedTodo, setUpdatedTodo] = useState({
    titleTask: titleTask,
    description: description,
  });

  return createPortal(
    <div className="animate-backdrop-in fixed inset-0 z-999 flex items-center justify-center bg-ink/50 backdrop-blur-sm">
      <div className="animate-modal-in w-full max-w-lg rounded-2xl border border-border bg-paper p-6 shadow-[0_24px_60px_-20px_rgba(11,18,32,0.35)]">
        <h2 className="font-display text-xl font-bold text-ink">{title}</h2>

        <div className="mt-6 flex flex-col gap-2">
          <label className="text-sm font-semibold text-ink">Title</label>
          <input
            type="text"
            value={updatedTodo.titleTask}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, titleTask: e.target.value })
            }
            className="rounded-lg border border-border bg-canvas/60 px-3.5 h-11 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/35 focus:border-accent transition-all duration-200"
          />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <label className="text-sm font-semibold text-ink">Description</label>
          <textarea
            rows={5}
            value={updatedTodo.description}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, description: e.target.value })
            }
            className="rounded-lg border border-border bg-canvas/60 p-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/35 focus:border-accent transition-all duration-200 resize-none"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-border bg-canvas px-4 py-2 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-border cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onConfirm(updatedTodo.titleTask, updatedTodo.description)
            }
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-primary-deep cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
