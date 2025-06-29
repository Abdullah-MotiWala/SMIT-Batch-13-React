import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ThemeProvider, { ThemeContext } from "./context";
import { Link } from "react-router";

const Home = () => {
  const [count, setCount] = useState(0);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ThemeProvider>
      <div className={theme ? "light-theme" : "dark-theme"}>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          {count > 0 && (
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          )}
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={toggleTheme}>count is {count}</button>
          <Link to={"/about-us"}>Go To About Us</Link>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </ThemeProvider>
  );
};

export default Home;
