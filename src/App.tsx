/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useCartStore } from "./stores/Cart.store";
import Products from "./pages/Products";
import { useSeenStore } from "./stores/Seen.store";
import { flushSync } from "react-dom";

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
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route
          index
          path="/products/:productId/:variant"
          element={<Products />}
        />
        {/* <Route path="about" element={<About />} />
         */}
      </Routes>
    </>
  );
}

export default App;
