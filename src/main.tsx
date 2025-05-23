import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, BrowserRouter, createBrowserRouter  } from "react-router-dom";
import App from "./App";
import HomePage from "./page/HomePage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/game",
        element: <App />,
    },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
    throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(

    <RouterProvider router={router} />
);
