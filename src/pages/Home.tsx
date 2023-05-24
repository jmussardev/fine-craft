/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import Hero from "../components/Hero";
import LinkToAll from "../components/LinkToAll";
import Products from "../components/Products";
import QuickAdd from "../components/QuickAdd";
import Separator from "../components/Separator";
import { useCartStore } from "../stores/Cart.store";
import { useEffect } from "react";

export default function Home() {
  const cartContent = useCartStore((state: any) => state.content);
  const resumeContent = useCartStore((state: any) => state.resumeContent);

  useEffect(() => {
    // console.log(cartContent);
    // console.log(localStorage);
    // console.log("cart" in localStorage);
    if ("cart" in localStorage) {
      const storage = localStorage.getItem("cart");
      // console.log(storage);
      resumeContent(storage);
    }
  }, []);

  return (
    <div className="container">
      <QuickAdd />
      <Header />
      <section className="content">
        <Hero />
        <div className="linkWrapper">
          <LinkToAll>
            <p
              style={{
                letterSpacing: "0.25rem",
              }}
            >
              show me everything
            </p>
            <span className="linkToAll__arrow">&gt;</span>
          </LinkToAll>
        </div>

        <Products />
        <div
          style={{
            paddingBottom: "3rem",
          }}
        >
          <div
            style={{
              paddingInline: "3rem",
              textAlign: "center",
            }}
          >
            <p style={{ letterSpacing: "0.09rem" }}>
              To do our designs justice we source quality materials that are
              assembled by select artisans in italy into bags, footwear, small
              leather goods, camera accessories and device cases. Authenticaly
              European. Made in Italy.
            </p>
            <LinkToAll>
              <p
                style={{
                  letterSpacing: "0.25rem",
                }}
              >
                show me everything
              </p>
              <span className="linkToAll__arrow">&gt;</span>
            </LinkToAll>
          </div>
        </div>

        <Separator />
      </section>
      <Footer />
    </div>
  );
}
