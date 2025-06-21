import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const useNonLoginRedirect = () => {
  const { userId } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    // const userId = localStorage.getItem("userId");
    if (!userId) navigate("/login");
  }, []);
};

export default useNonLoginRedirect;
