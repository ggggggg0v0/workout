import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Workout from "./pages/workout";
import Routine from "./pages/routine";
import Flow from "./pages/flow";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/flow",
        element: <Flow />,
      },
      {
        path: "/workout",
        element: <Workout />,
      },
      {
        path: "/routine",
        element: <Routine />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
