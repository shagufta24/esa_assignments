import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/auth";
import HomePage from "./pages/home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AuthPage />,
	},
	{
		path: "/contacts",
		element: <HomePage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
