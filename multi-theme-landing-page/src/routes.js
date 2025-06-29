import { createBrowserRouter } from "react-router";
import Home from "./home";
import About from "./about";

const routes = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/about-us",
    Component: About,
  },
];

export const browserRoutes = createBrowserRouter(routes);
