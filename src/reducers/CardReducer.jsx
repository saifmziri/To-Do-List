export default function taskReducer(taskData, action) {
  switch (action.type) {
    case "ADD_TASK": {
      const title = action.payload.taskTitle.trim();
      if (!title) return taskData;

      const newTask = {
        id: Date.now(),
        title,
        description: "New task added.",
        isCompleted: false,
      };

      return [...taskData, newTask];
    }

    case "TOGGLE_TASK":
      return taskData.map((task) =>
        task.id === action.payload.id
          ? { ...task, isCompleted: !task.isCompleted }
          : task,
      );

    case "UPDATE_TASK":
      return taskData.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              title: action.payload.title,
              description: action.payload.description,
            }
          : task,
      );

    case "DELETE_TASK":
      return taskData.filter((task) => task.id !== action.payload.id);

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}