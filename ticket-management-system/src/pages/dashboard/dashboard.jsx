import { useSelector } from "react-redux";
import { Link } from "react-router";

const Dashboard = () => {
  const { userId } = useSelector((state) => state.user);
  console.log(userId, "===userId");

  return (
    <div>
      Dashboard
      <Link to="/login">Route To Login</Link>
    </div>
  );
};

export default Dashboard;
