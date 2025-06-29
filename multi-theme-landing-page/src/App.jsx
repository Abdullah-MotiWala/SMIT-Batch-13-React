import "./App.css";
import { RouterProvider } from "react-router";
import { browserRoutes } from "./routes";
import ThemeProvider, { ThemeContext } from "./context";
import { useState } from "react";

function App() {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={browserRoutes} />
      </ThemeProvider>
    </>
  );
}

export default App;
