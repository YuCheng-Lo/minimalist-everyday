import Layout from "../layouts/Layout";
import Home from "../pages/front/Home";
import Products from "../pages/front/Products";
import ProductDetail from "../pages/front/ProductDetail";
import ProductError from "../pages/front/ProductError";
import Cart from "../pages/front/Cart";
import Checkout from "../pages/front/Checkout";
import Payment from "../pages/front/Payment";
import CheckoutSuccess from "../pages/front/CheckoutSuccess";
import Login from "../pages/Login";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import NotFound from "../pages/NotFound";

import AdminLayout from "../layouts/AdminLayout";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";

import { frontendProductsApi } from "../services/frontendProductService";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
        errorElement: <ProductError />,
        loader: async ({ params }) => {
          const res = await frontendProductsApi.getProduct(params.id);

          if (!res.data.product) {
            throw new Response("Product Not Found", { status: 404 });
          }

          return res.data.product;
        },
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "payment/:orderId",
        element: <Payment />,
      },
      {
        path: "checkout-success/:orderId",
        element: <CheckoutSuccess />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
