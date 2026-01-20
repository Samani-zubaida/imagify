import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppContext } from "./context/AppContextProvider.jsx";
import { useState } from "react";
import AppContextProvider from "./context/AppContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <AppContextProvider>
    <App/>
  </AppContextProvider>
   </BrowserRouter>
);
