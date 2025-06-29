import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { ThemeContext } from "./context";
import { Link } from "react-router";

const About = () => {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log(theme);
  return (
    <div className={theme ? "light-theme" : "dark-theme"}>
      {count > 0 && (
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      )}
      <button onClick={toggleTheme}>count is {count}</button>
      <Link to={"/"}>Go To Home</Link>
      <h1>This is about us</h1>
    </div>
  );
};

export default About;
