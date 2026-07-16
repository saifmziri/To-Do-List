import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const STYLES = {
  success: {
    icon: faCircleCheck,
    className: "bg-success-soft border-success/30 text-success",
    iconClass: "text-success",
  },
  error: {
    icon: faCircleExclamation,
    className: "bg-danger-soft border-danger/30 text-danger",
    iconClass: "text-danger",
  },
};

export default function Toast({ open, message, type = "success" }) {
  if (!open) return null;

  const style = STYLES[type] ?? STYLES.success;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex max-w-sm items-center gap-3 rounded-lg border px-4 py-3 shadow-[0_16px_40px_-16px_rgba(11,18,32,0.35)]
        animate-fade-in-down transition-all duration-300 ${style.className}`}
      role="alert"
    >
      <FontAwesomeIcon
        icon={style.icon}
        className={`text-lg ${style.iconClass}`}
      />
      <p className="flex-1 text-right text-sm font-medium text-ink">
        {message}
      </p>
    </div>
  );
}
