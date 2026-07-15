import { createSlice } from "@reduxjs/toolkit";

function loadTasksFromStorage() {
  try {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

const initialState = {
  tasks: loadTasksFromStorage(),
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const title = action.payload.taskTitle.trim();
      if (!title) return;

      state.tasks.push({
        id: Date.now(),
        title,
        description: "New task added.",
        isCompleted: false,
      });
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.isCompleted = !task.isCompleted;
    },
    updateTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const { addTask, toggleTask, updateTask, deleteTask } =
  taskSlice.actions;
export default taskSlice.reducer;
