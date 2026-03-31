import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/home";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Login/Login";
import CreatePost from "../pages/CreatePost/CreatePost";
import NotFound from "../pages/NotFound/Notfound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/createpost",
        element: <CreatePost></CreatePost>,
      },
    ],
    errorElement:<NotFound></NotFound>
  },
]);
