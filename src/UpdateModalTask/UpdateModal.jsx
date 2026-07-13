import { useState } from "react";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">{title}</h2>

        <div className="mb-4 flex flex-col gap-2">
          <label className="font-medium">Title</label>

          <input
            type="text"
            value={updatedTodo.titleTask}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, titleTask: e.target.value })
            }
            className="rounded-md border border-gray-300 p-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <label className="font-medium">Description</label>

          <textarea
            rows={5}
            value={updatedTodo.description}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, description: e.target.value })
            }
            className="rounded-md border border-gray-300 p-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="cursor-pointer rounded-md bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onConfirm(updatedTodo.titleTask, updatedTodo.description)
            }
            className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
