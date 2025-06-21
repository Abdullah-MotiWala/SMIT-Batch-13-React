import { Outlet } from "react-router";
import useLoginRedirect from "../../hooks/useLoginRedirect";

const AuthLayout = () => {
  useLoginRedirect();
  return <Outlet />;
};

export default AuthLayout;
