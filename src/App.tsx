/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useCartStore } from "./stores/Cart.store";
import { useSeenStore } from "./stores/Seen.store";
import { flushSync } from "react-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const Home = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return import("./pages/Home");
});
const Login = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return import("./pages/Login");
});
const Products = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return import("./pages/Products");
});
// const Home = lazy(() => import("./pages/Home"));
// const Login = lazy(() => import("./pages/Login"));
// const Products = lazy(() => import("./pages/Products"));

function App() {
  const resumeCart = useCartStore((state: any) => state.resumeContent);
  const resumeSeen = useSeenStore((state: any) => state.resumeContent);
  const handleResumeSeen = () => {
    if ("seen" in localStorage) {
      const storage = localStorage.getItem("seen");
      if (!storage) return;
      flushSync(() => {
        resumeSeen(JSON.parse(storage));
      });
    }
  };
  handleResumeSeen();

  useEffect(() => {
    if ("cart" in localStorage) {
      const storage = localStorage.getItem("cart");
      if (!storage) return;
      resumeCart(JSON.parse(storage));
    }
  }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index path="/test" element={<Loader />} />
          <Route index path="/" element={<Home />} />
          <Route index path="/login" element={<Login />} />
          <Route
            index
            path="/products/:productId/:variant"
            element={<Products />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
