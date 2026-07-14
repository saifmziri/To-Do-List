/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";
import taskReducer from "../reducers/CardReducer";

const TaskDataContext = createContext(null);

export function TaskDataProvider({ children }) {
  const [taskData, dispatch] = useReducer(taskReducer, [], () => {
    const storageData = localStorage.getItem("taskData");
    return storageData ? JSON.parse(storageData) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(taskData));
  }, [taskData]);

  return (
    <TaskDataContext.Provider value={{ taskData, dispatch }}>
      {children}
    </TaskDataContext.Provider>
  );
}

export const useTaskData = () => useContext(TaskDataContext);
