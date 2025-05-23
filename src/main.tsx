import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter  } from "react-router-dom";
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
