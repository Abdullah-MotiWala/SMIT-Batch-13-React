import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// const rawHTML = document.getElementById("root");
// const root = createRoot(rawHTML);

// root.render(<App />);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
