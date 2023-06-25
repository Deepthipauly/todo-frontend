// package import
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// file import
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import TodoList from "./components/todoList/todoList";
import Todo from "./components/todo/todo";
import Header from "./components/layout/header";
import Edit from "./components/edit/edit";

// css import
import "bootswatch/dist/quartz/bootstrap.min.css";

// defined routes
const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Login />,
  },

  { path: "/auth/register", element: <Register /> },

  {
    path: "/todos",
    element: (
      <>
        <Header /> <TodoList />
      </>
    ),
  },

  {
    path: "/todo/:id",
    element: (
      <>
        <Header /> <Todo />
      </>
    ),
  },

  {
    path: "/edit/:id",
    element: (
      <>
        <Header /> <Edit />
      </>
    ),
  },
  { path: "/", element: <Home /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
