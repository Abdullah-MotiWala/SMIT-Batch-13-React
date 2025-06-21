import { Outlet } from "react-router";
import useNonLoginRedirect from "../../hooks/useNonLoginRedirect";

const NonAuthLayout = () => {
  useNonLoginRedirect();
  return (
    <div>
      <p>header</p>
      <Outlet />
      <p>footer</p>
    </div>
  );
};

export default NonAuthLayout;
