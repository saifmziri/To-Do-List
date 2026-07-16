# To-Do List — React + Redux Toolkit + Tailwind CSS

A simple To-Do List application built as a **learning project** to practice React fundamentals, state management with **Redux Toolkit**, and styling with **Tailwind CSS**.

## Tech Stack

- **React** (Vite)
- **Redux Toolkit** + **react-redux** — global state management for tasks
- **React Context API** — used only for toast notifications (a smaller, isolated piece of UI state)
- **Tailwind CSS** — utility-first styling
- **FontAwesome** — icons for actions (check, edit, delete)

## Features

- Add a new task
- Mark a task as complete / incomplete
- Edit a task's title and description
- Delete a task (with a confirmation dialog)
- Filter tasks by status: **All / Completed / Incomplete**
- Toast notifications on every action (add, update, delete, toggle)
- Tasks persist in **localStorage** — data survives a page refresh

## Project Structure

```
src/
├── app/
│   └── store.js               # Redux store configuration + localStorage sync
├── assets/
├── components/
│   ├── card/
│   │   └── Card.jsx           # Main task manager UI (filters, add task, list)
│   └── task/
│       └── Task.jsx           # Single task item (check/edit/delete actions)
├── confirm/
│   └── Confirm.jsx            # Confirmation modal (used before delete)
├── context/
│   └── ToastContext.jsx       # Toast notification system (Context API)
├── features/
│   └── tasks/
│       └── taskSlice.js       # Redux slice: state, reducers, actions for tasks
├── toast/
├── UpdateModalTask/
│   └── UpdateModal.jsx        # Modal for editing a task
├── App.jsx
├── App.css
├── index.css
└── main.jsx                   # App entry point, wraps <App /> with <Provider store={store}>
```

## State Management: Why Redux _and_ Context?

This project intentionally uses **two different approaches** side by side, as a learning exercise:

| State                          | Tool                         | Why                                                                                  |
| ------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------ |
| Tasks (add/edit/delete/toggle) | **Redux Toolkit**            | Core app data, benefits from a centralized store, DevTools, and predictable updates. |
| Toast notifications            | **React Context + useState** | Small, self-contained UI state that doesn't need Redux's overhead.                   |

> Note: an earlier version of this project managed tasks with `TaskDataContext` (Context + `useReducer`). It has since been fully replaced by the Redux `tasks` slice — Context and Redux are **not** managing the same data simultaneously.

## How Redux Is Wired Up

```
main.jsx
  └─ <Provider store={store}>   → makes the store available to the whole component tree
       └─ store.js              → configureStore({ reducer: { tasks: taskReducer } })
            └─ taskSlice.js     → defines initialState, reducers (addTask, toggleTask,
                                   updateTask, deleteTask), and auto-generated action creators
                 └─ Card.jsx / Task.jsx
                      ├─ useSelector((state) => state.tasks.tasks)  → read data
                      └─ useDispatch() + dispatch(addTask(...))      → send actions
```

`store.js` also subscribes to every state change and persists the `tasks` array to `localStorage`, so data survives a page refresh.

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build
```

## Purpose

This repo is for **learning purposes only** — practicing:

- React component structure and props
- Redux Toolkit fundamentals (slices, actions, the store, `useSelector`/`useDispatch`)
- Mixing Context API and Redux appropriately
- Tailwind CSS for rapid UI styling
