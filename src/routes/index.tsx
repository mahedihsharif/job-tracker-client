import App from "@/App";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import { withAuth } from "@/utils/withAuth";
import { withPublic } from "@/utils/withPublic";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: withAuth(Home),
        index: true,
      },
      {
        Component: withPublic(Register),
        path: "register",
      },
      {
        Component: withPublic(Login),
        path: "login",
      },
    ],
  },
]);
