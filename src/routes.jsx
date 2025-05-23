// src/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import NotFound from "./pages/NotFound/NotFound";
import Aichat from "./pages/Ai/Aichat.jsx";
import Members from "./pages/Members/Members.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "aichat", 
        element: <Aichat />,
      },
      {
        path: "members",
        element: <Members />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;