import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "bootswatch/dist/quartz/bootstrap.min.css";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import TodoList from "./components/todoList/todoList";
import Todo from "./components/todo/todo";
import Header from "./components/layout/header";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  {
    path: "/auth/login",
    element: <Login />,
  },

  { path: "/auth/register", element:<Register />},

  { path: "/todos", element: <><Header/> <TodoList /></> },

  {
    path: "/view_todo/:id",
    element: <><Header/> <Todo /></>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
