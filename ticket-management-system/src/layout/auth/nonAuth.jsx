import { Outlet, useNavigate } from "react-router";
import useNonLoginRedirect from "../../hooks/useNonLoginRedirect";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/user";
import CustomSidebar from "../../components/customSidebar";

const NonAuthLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useNonLoginRedirect();
  const onLogoutClick = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <div>
      {/* <Button onClick={onLogoutClick}>Logout</Button> */}
      <CustomSidebar>
        <Outlet />
      </CustomSidebar>
      {/* <p>footer</p> */}
    </div>
  );
};

export default NonAuthLayout;
