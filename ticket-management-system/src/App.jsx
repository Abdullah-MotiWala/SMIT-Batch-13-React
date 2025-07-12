import { Route, Routes } from "react-router";
import Signup from "./pages/signup/signup";
import "./App.css";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Organzation from "./pages/organization/organization";
import Form from "./pages/organization/form";
import User from "./pages/user/user";
import UserForm from "./pages/user/form";
import Edit from "./pages/organization/edit";
import View from "./pages/organization/view";
// import Ticket from "./pages/ticket/ticket";
import AddForm from "./pages/ticket/add";
import AuthLayout from "./layout/auth/auth";
import NonAuthLayout from "./layout/auth/nonAuth";
import Parent from "./test/parent";
import { lazy } from "react";

const Ticket = lazy(() => import("./pages/ticket/ticket"));

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<NonAuthLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organization">
          <Route index element={<Organzation />} />
          <Route path="form" element={<Form />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="view/:id" element={<View />} />
        </Route>
        <Route path="/ticket">
          <Route index element={<Ticket />} />
          <Route path="add" element={<AddForm />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="view/:id" element={<View />} />
        </Route>
        <Route path="/user">
          <Route index element={<User />} />
          <Route path="form" element={<UserForm />} />
        </Route>
      </Route>
      <Route path="/test" element={<Parent />} />
    </Routes>
  );
}

export default App;
