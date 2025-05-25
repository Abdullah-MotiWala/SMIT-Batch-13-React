import { Route, Routes } from "react-router";
import Signup from "./pages/signup/signup";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/admin/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
