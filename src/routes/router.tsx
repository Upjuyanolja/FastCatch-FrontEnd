import { createBrowserRouter } from "react-router-dom";
import { PATH } from "./constants";
import {
  Home,
  Accommodation,
  Order,
  Members,
  OrderList,
  Signup,
  Login,
} from "../pages";
import App from "../App";
import OrderResult from "../pages/orderResult/OrderResult";

const router = createBrowserRouter([
  {
    path: PATH.MAIN,
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: PATH.ACCOMMODATION,
        element: <Accommodation />,
      },
      {
        path: PATH.ORDER,
        element: <Order />,
      },
      {
        path: PATH.ORDERTRESULT,
        element: <OrderResult />,
      },
      {
        path: PATH.MEMBERS,
        element: <Members />,
      },
      {
        path: PATH.ORDERLIST,
        element: <OrderList />,
      },
    ],
  },
  {
    path: PATH.SIGN_UP,
    element: <Signup />,
  },
  {
    path: PATH.LOGIN,
    element: <Login />,
  },
]);

export default router;
