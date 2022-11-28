import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './Pages/Home/HomePage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './Pages/Auth/LoginPage';
import RegistrationPage from './Pages/Auth/RegistrationPage';

const router = createBrowserRouter([
  {
    path: "/",
    element:<HomePage />,
  },
  {
    path: "/login",
    element:<LoginPage />,
  },
  {
    path: "/register",
    element:<RegistrationPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
