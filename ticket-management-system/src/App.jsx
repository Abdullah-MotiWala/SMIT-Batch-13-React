import { Route, Routes } from "react-router";
import Signup from "./pages/signup/signup";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Organzation from "./pages/organization/organization";
import Form from "./pages/organization/form";
import User from "./pages/user/user";
import UserForm from "./pages/user/form";

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
      <Route path="/user">
        <Route index element={<User />} />
        <Route path="form" element={<UserForm />} />
      </Route>
    </Routes>
  );
}

export default App;
