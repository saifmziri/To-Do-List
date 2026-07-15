import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const STYLES = {
  success: {
    icon: faCircleCheck,
    className: "bg-green-50 border-green-300 text-green-800",
    iconClass: "text-green-500",
  },
  error: {
    icon: faCircleExclamation,
    className: "bg-red-50 border-red-300 text-red-800",
    iconClass: "text-red-500",
  },
};

export default function Toast({ open, message, type = "success" }) {
  if (!open) return null;

  const style = STYLES[type] ?? STYLES.success;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg
        animate-fade-in-down transition-all duration-300 max-w-sm ${style.className}`}
      role="alert"
    >
      <FontAwesomeIcon
        icon={style.icon}
        className={`text-lg ${style.iconClass}`}
      />
      <p className="font-medium text-sm text-right flex-1">{message}</p>
    </div>
  );
}
