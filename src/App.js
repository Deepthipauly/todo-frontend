import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import "bootswatch/dist/quartz/bootstrap.min.css";
import Home from './components/home/home';
import Login from './components/login/login';
import Register from './components/register/register';
import TodoList from './components/todoList/todoList';



const router =createBrowserRouter([


{path:"/",
element: <Home/>},

{
  path:"/auth/login",
  element:<Login/>
},

{path:"/auth/register",
element:<Register/>
},

{path:"/todo",
element:<TodoList/>
}




])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
