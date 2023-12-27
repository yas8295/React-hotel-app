import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout/AppLayout";
import Home from "./Pages/Home";
import { Provider } from "react-redux";
import store from "./Services/Store";
import Error from "./Pages/Error";
import Menu from "./Pages/Menu";
import { loader as menuLoader } from "./Pages/Menu";
import Cart from "./Pages/Cart";
import NewOrder, { action as actionCreateOrder } from "./Pages/NewOrder";
import Order, {
  action as actionOrderUpdate,
  loader as loaderOrder,
} from "./Pages/Order";
import OrderError from "./Components/OrderError";

const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,
    errorElement: <Error></Error>,
    path: "/React-Pizza-App/",
    children: [
      {
        path: "/React-Pizza-App/",
        element: <Home></Home>,
        errorElement: <Error></Error>,
      },
      {
        path: "/React-Pizza-App/Menu",
        element: <Menu></Menu>,
        loader: menuLoader,
        errorElement: <h1>sad</h1>,
      },
      { path: "/React-Pizza-App/Cart", element: <Cart></Cart> },
      {
        path: "/React-Pizza-App/order/new",
        element: <NewOrder></NewOrder>,
        action: actionCreateOrder,
        errorElement: <Error></Error>,
      },
      {
        path: "/React-Pizza-App/order/:orderId",
        element: <Order></Order>,
        loader: loaderOrder,
        action: actionOrderUpdate,
        errorElement: <OrderError></OrderError>,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}
