import { Route, Routes } from "react-router";
import Signup from "./pages/signup/signup";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Organzation from "./pages/organization/organization";
import Form from "./pages/organization/form";

function App() {
  return (
    <Routes>
      <Route path="/admin/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/organization">
        <Route index element={<Organzation />} />
        <Route path="form" element={<Form />} />
      </Route>
    </Routes>
  );
}

export default App;
