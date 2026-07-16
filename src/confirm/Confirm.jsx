import { createPortal } from "react-dom";

export default function Confirm({ title, description, onConfirm, onCancel }) {
  return createPortal(
    <div className="animate-backdrop-in fixed inset-0 z-50 flex items-center justify-center bg-ink/50 backdrop-blur-sm">
      <div className="animate-modal-in w-full max-w-md rounded-2xl border border-border bg-paper p-6 shadow-[0_24px_60px_-20px_rgba(11,18,32,0.35)]">
        <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
        <p className="mt-2 text-sm text-muted">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded-lg border border-border bg-canvas px-4 py-2 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-border cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-danger-deep cursor-pointer"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}