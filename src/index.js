import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css';
import LoginPage from './Pages/Auth/LoginPage';
import RegistrationPage from './Pages/Auth/RegistrationPage';
import CategoriesPage from './Pages/Categories/CategoriesPage';
import HomePage from './Pages/Home/HomePage';
import ApiClient from './Utils/ApiClient';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
  {
    path:"/categories",
    element:<CategoriesPage />
  }
]);

if (localStorage.getItem("token") && localStorage.getItem("refresh")) {
  setInterval(() => {
    ApiClient.post("/auth/refresh/", {
      refresh: localStorage.getItem("refresh"),
    }).then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refresh", res.data.refresh);
    }
    );
  }, 60000);
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
