import { CreateOrderPage } from "pages";
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { PATH } from "./path";

const Router = () => {
  const routes: RouteObject[] = [
    {
      path: PATH.CREATE_ORDER,
      element: <CreateOrderPage />,
    },
    {
      path: "*",
      element: <Navigate to={PATH.CREATE_ORDER} />,
    },
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default Router;
