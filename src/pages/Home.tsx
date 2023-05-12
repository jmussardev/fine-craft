import Footer from "../components/Footer";
import { Header } from "../components/Header";
import Hero from "../components/Hero";
import LinkToAll from "../components/LinkToAll";
import Products from "../components/Products";
import Separator from "../components/Separator";

export default function Home() {
  return (
    <div className="container">
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
