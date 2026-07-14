/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";
import Toast from "../toast/Toast";

const ToastContext = createContext({});

//children: ava aw hami tshtet nav (ToastProvider) <ToastProvider>Har tshtak dnavda d bita child</ToastProvider> da d init
//  waki ma d app da gazi kriye
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const timeoutRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setToast({ open: true, message, type });

    timeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 2000);
  }, []);

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast open={toast.open} message={toast.message} type={toast.type} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
