import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const useLoginRedirect = () => {
  const { userId } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    // const userId = localStorage.getItem("userId");
    if (userId) navigate("/dashboard");
  }, []);
};

export default useLoginRedirect;
