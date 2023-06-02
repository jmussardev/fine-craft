/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../components/Footer";
import Header from "../components/Header";
import Separator from "../components/Separator";
import data from "./../data/products.json";
import infos from "./../data/infos.json";
const firstPhoto = data[0].variants[0].photos[0];
import { useState, useEffect, useRef } from "react";
import AddCartBtn from "../components/AddCartBtn";
import shopPay from "./../assets/img/icons/Shop.svg";
import leather from "./../assets/img/leather-swatches-wide_8b162bf1-66b2-4bad-845a-8a94d8444bb8.jpg";
import LinkToAll from "../components/LinkToAll";
import Tabs from "../components/Tabs";
import Reviews from "../components/Reviews";
import Carousel from "../components/Carousel";
import left from "./../assets/img/icons/bxs-chevron-left.svg";
import cross from "./../assets/img/icons/cross-icon.svg";
import Preview from "../components/Preview";
import { useCarouselStore } from "../stores/Carousel.store";

export default function Products() {
  const [isCurrent, setIsCurrent] = useState<number | null>(0);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const setIndex = useCarouselStore((state: any) => state.setIndex);
  // const currentIndex = useCarouselStore((state: any) => state.index);
  const setIsCarouselOpen = useCarouselStore((state: any) => state.setIsOpen);
  const isCarouselOpen = useCarouselStore((state: any) => state.isOpen);
  const handleToggle = (index: number) => {
    setIsCurrent(isCurrent === index ? null : index);
  };
  const [test, setTest] = useState(false);
  const isZooming = (index: number) => {
    if (index === zoomIndex) return true;
    else return false;
  };
  // const imgRef = useRef<HTMLImageElement>(null);
  // useEffect(() => {
  //   if (zoomIndex) setZoomIndex(null);
  // }, [zoomIndex]);
  return (
    <div className="container">
      {/* {isCarouselOpen ? (
        <div className="products-carousel">
          <div className="products-carousel__header">
            <div className="products-carousel__header__wrapper">
              <button
                className="products-carousel__header__title"
                onClick={() => {
                  setIsCarouselOpen(false);
                }}
              >
                <p>
                  <img src={left} alt="" /> item title
                </p>
              </button>

              <button
                className="products-carousel__header__close"
                onClick={() => {
                  setIsCarouselOpen(false);
                }}
              >
                <img src={cross} alt="" />
              </button>
            </div>
          </div>
          <div className="products-carousel__wrapper">
            <Carousel items={data[0].variants[0].photos} />
          </div>
          <div className="products-carousel__preview">
            <Preview items={data[0].variants[0].photos} />
          </div>
        </div>
      ) : (
        ""
      )} */}
      <div
        className={` ${
          isCarouselOpen
            ? "products-carousel products-carousel--open"
            : "products-carousel"
        }`}
      >
        <div className="products-carousel__header">
          <div className="products-carousel__header__wrapper">
            <button
              className="products-carousel__header__title"
              onClick={() => {
                setIsCarouselOpen(false);
              }}
            >
              <p>
                <img src={left} alt="" /> item title
              </p>
            </button>

            <button
              className="products-carousel__header__close"
              onClick={() => {
                setIsCarouselOpen(false);
              }}
            >
              <img src={cross} alt="" />
            </button>
          </div>
        </div>
        <div className="products-carousel__wrapper">
          <Carousel items={data[0].variants[0].photos} />
        </div>
        <div className="products-carousel__preview">
          <Preview items={data[0].variants[0].photos} />
        </div>
      </div>

      <Header />

      <section className="products-content">
        <div className="products-content__pictures">
          <img
            src={firstPhoto}
            alt=""
            onClick={(e) => {
              setIndex(0);
              setZoomIndex(0);
              setTest(true);
              setIsCarouselOpen(true);
              const target = e.target as HTMLImageElement;

              const dimension = target?.getBoundingClientRect();

              document.body.style.setProperty(
                "--img-dimension-height",
                `${dimension.height}px`
              );
              document.body.style.setProperty(
                "--img-dimension-width",
                `${dimension.width}px`
              );
              document.body.style.setProperty(
                "--img-coordinate-top",
                `${dimension.y}px`
              );
              document.body.style.setProperty(
                "--img-coordinate-left",
                `${dimension.x}px`
              );
            }}
          />
          <div className="products-content__pictures__other">
            {data[0].variants[0].photos.map((photo, index) => {
              if (index === 0) {
                return "";
              } else {
                return (
                  <img
                    key={index}
                    src={photo}
                    alt=""
                    onClick={(e) => {
                      setIndex(index);
                      setZoomIndex(index);
                      setTest(true);
                      setIsCarouselOpen(true);
                      const target = e.target as HTMLImageElement;
                      const dimension = target?.getBoundingClientRect();
                      console.log(dimension.width, dimension.height);

                      document.body.style.setProperty(
                        "--img-dimension-height",
                        `${dimension.height}px`
                      );
                      document.body.style.setProperty(
                        "--img-dimension-width",
                        `${dimension.width}px`
                      );
                      document.body.style.setProperty(
                        "--img-coordinate-top",
                        `${dimension.y}px`
                      );
                      document.body.style.setProperty(
                        "--img-coordinate-left",
                        `${dimension.x}px`
                      );
                    }}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="products-content__details">
          <div className="products-content__details__options">
            <div className="products-content__details__options__path">
              <p>Home &bull; Fuzzy iPhone 14 Cover . Dusty Brown </p>
            </div>
            <div className="products-content__details__options__title">
              <h1>Fuzzy iPhone 14 Cover . Dusty Brown </h1>
            </div>
            <div className="products-content__details__options__price">
              <p>€72,95</p>
            </div>
            <div className="products-content__details__options__variants">
              {data[0]?.variants.map((variant, index) => (
                <div
                  key={index}
                  // onMouseEnter={handleMouseEnter}
                  // onMouseLeave={handleMouseLeave}
                  // title={isHover ? item.name + ". " + variant.variant : ""}
                  // onClick={() => {
                  //   setcurrentVariant(variant);
                  // }}
                  // className={`${
                  //   variant === currentVariant ? "currentVariant" : ""
                  // }`}
                >
                  <img src={variant.photos[0]} alt="" />
                </div>
              ))}
            </div>
            <div className="products-content__details__options__types">
              {data[0]?.type.map((type, index) => (
                <button
                  key={index}
                  //   onClick={() => {
                  //     setcurrentType(type);
                  //   }}
                  //   className={`${isTypeAvailable(type) ? "" : "notAvailable"} ${
                  //     isCurrentType(type) ? "currentType" : ""
                  //   }`}
                  //   disabled={!isTypeAvailable(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="products-content__details__options__add">
              <AddCartBtn location={"product"} />
              <button className="products-content__details__options__add__btn">
                <img src={shopPay} alt="" />
              </button>
            </div>
          </div>
          <div className="products-content__details__infos ">
            {infos.map((info, index) => {
              return (
                <div
                  key={index}
                  className="products-content__details__infos__wrapper"
                >
                  <div className="products-content__details__infos__wrapper__title">
                    <p>{info.title}</p>
                    <button
                      className="products-content__details__infos__wrapper__title__btn"
                      onClick={() => {
                        handleToggle(index);
                      }}
                    >
                      <div
                        className={`products-content__details__infos__wrapper__title__btn__icon ${
                          isCurrent === index
                            ? "products-content__details__infos__wrapper__title__btn__icon--open"
                            : ""
                        }`}
                      >
                        <div></div>
                      </div>
                    </button>
                  </div>
                  <div
                    className={`products-content__details__infos__wrapper__content ${
                      isCurrent === index
                        ? " products-content__details__infos__wrapper__content--open"
                        : ""
                    }   `}
                    dangerouslySetInnerHTML={{ __html: info.content }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Separator />
      <section className="products-materials">
        <article className="products-materials__text">
          <h3>The Materials</h3>
          <br />
          <p>
            <strong>
              Timeless designs, well-made, resourceful and sustainable.
            </strong>
          </p>
          <br />
          <p>
            100% of our leathergoods and footwear are all made in Italy from
            locally sourced Italian and European materials. We’ve spent the last
            16 years tracking down the best suppliers, materials and
            manufacturers to ensure we do justice to our designs.
          </p>
          <br />
          <div className="products-materials__link">
            <LinkToAll>
              <p
                style={{
                  letterSpacing: "0.2rem",
                  fontWeight: "100",
                }}
              >
                learn more
              </p>
              <span className="linkToAll__arrow">&gt;</span>
            </LinkToAll>
          </div>
        </article>
        <img className="products-materials__img" src={leather} alt="" />
      </section>
      <section className="products-tabs">
        <Tabs />
      </section>
      <section className="products-reviews">
        <Reviews />
      </section>
      <Footer />
    </div>
  );
}
