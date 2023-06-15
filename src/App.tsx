/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useCartStore } from "./stores/Cart.store";
import Products from "./pages/Products";

function App() {
  const resumeContent = useCartStore((state: any) => state.resumeContent);

  useEffect(() => {
    if ("cart" in localStorage) {
      const storage = localStorage.getItem("cart");
      if (!storage) return;
      resumeContent(JSON.parse(storage));
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
        <Route path="models" element={<Models />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </>
  );
}

export default App;
