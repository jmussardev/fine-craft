/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../components/Footer";
import Header from "../components/Header";
import Separator from "../components/Separator";
import data from "./../data/products.json";
import infos from "./../data/infos.json";
import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { ItemVariant } from "./../../config/types";
import Swatches from "../components/Swatches";
import { Link } from "react-router-dom";
import ProductPreview from "../components/ProductPreview";
import QuickAdd from "../components/QuickAdd";
import useSeen from "./../../hooks/useSeen";

// interface types {
//   [key: string]: boolean;
// }

export default function Products() {
  const { addItem } = useSeen();

  /**
   * States
   */
  const { productId, variant } = useParams();

  const currentItem = productId
    ? (data[parseInt(productId) - 1].variants as ItemVariant[])
    : null;
  const currentVariant = currentItem
    ? (currentItem.find((vrt: any) => vrt.variant === variant) as ItemVariant)
    : null;
  const [isCurrent, setIsCurrent] = useState<number | null>(0);
  const [currentType, setCurrentType] = useState(
    productId ? data[parseInt(productId) - 1]?.type[0] : null
  );
  const setIndex = useCarouselStore((state: any) => state.setIndex);
  const setIsCarouselOpen = useCarouselStore((state: any) => state.setIsOpen);
  const isCarouselOpen = useCarouselStore((state: any) => state.isOpen);
  const isZooming = useCarouselStore((state: any) => state.isZooming);
  const [currentFirstIndex, setCurrentFirstIndex] = useState(0);
  const [currentFirst, setCurrentFirst] = useState(
    currentVariant ? currentVariant.photos[0] : ""
  );

  const infosData = infos;
  infosData[0].content = productId
    ? data[parseInt(productId) - 1].description
    : "";

  // const currentFirst = currentVariant ? currentVariant.photos[0] : "";

  /**
   * Functions
   */
  const handleToggle = (index: number) => {
    setIsCurrent(isCurrent === index ? null : index);
  };
  const setDimensions = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
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
    document.body.style.setProperty("--img-coordinate-top", `${dimension.y}px`);
    document.body.style.setProperty(
      "--img-coordinate-left",
      `${dimension.x}px`
    );
  };
  const isTypeAvailable = (type: string) => {
    if (currentVariant) {
      const types: any = currentVariant.isAvailable;
      return types[type];
    }
  };
  const isCurrentType = (type: string) => {
    return currentType === type;
  };
  const handleFirstAvailable = () => {
    if (currentVariant) {
      const types: any = currentVariant.isAvailable;
      for (const key in types) {
        if (types[key] === true) return key;
      }
    }
    return "";
  };
  const handleOpenCarousel = () => {
    setIsCarouselOpen(true);
  };
  const handleCloseCarousel = () => {
    setIsCarouselOpen(false);
  };

  /**
   * Effects
   */

  useEffect(() => {
    window.scroll(0, 0);
  }, [productId, currentVariant]);

  useEffect(() => {
    if (!productId || currentVariant === null) return;
    addItem(productId, currentVariant.variant);
  }, [productId, currentVariant]);

  useEffect(() => {
    const handleCloseCarousel = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.code === "Space") {
        setIsCarouselOpen(false);
      }
    };
    window.addEventListener("keydown", (e) => {
      handleCloseCarousel(e);
    });
    return () => {
      window.removeEventListener("keydown", (e) => {
        handleCloseCarousel(e);
      });
    };
  }, [isCarouselOpen === true]);

  useEffect(() => {
    const lockScroll = () => {
      if (isCarouselOpen) {
        window.scroll(0, 0);
      }
    };
    window.addEventListener("scroll", lockScroll);
    return () => {
      window.removeEventListener("scroll", lockScroll);
    };
  });

  useEffect(() => {
    if (currentVariant) setCurrentType(handleFirstAvailable());
    setCurrentFirst(currentVariant ? currentVariant.photos[0] : "");
  }, [currentVariant]);

  useEffect(() => {
    setCurrentFirst(
      currentVariant ? currentVariant.photos[currentFirstIndex] : ""
    );
  }, [currentFirstIndex]);

  return (
    <div className="container">
      <div
        className={` ${
          isCarouselOpen
            ? "products-carousel products-carousel--open"
            : "products-carousel"
        }`}
      >
        <div className="products-carousel__header">
          <div className={`products-carousel__header__wrapper `}>
            <button
              className="products-carousel__header__title"
              onClick={() => {
                handleCloseCarousel();
              }}
            >
              <p>
                <img src={left} alt="" />{" "}
                {productId ? data[parseInt(productId) - 1].name : ""} .{" "}
                {currentVariant?.variant}
              </p>
            </button>

            <button
              className="products-carousel__header__close"
              onClick={() => {
                handleCloseCarousel();
              }}
            >
              <img src={cross} alt="" />
            </button>
          </div>
        </div>
        <div
          className={`products-carousel__wrapper ${
            isZooming ? "products-carousel__wrapper--zoom" : ""
          }`}
        >
          <Carousel items={currentVariant?.photos} />
        </div>
        <div className="products-carousel__preview">
          <Preview items={currentVariant?.photos} />
        </div>
      </div>
      <QuickAdd />
      <Header />

      <section className="products-content">
        <div className="products-content__pictures">
          <img
            className="products-content__pictures__first"
            key={currentFirst}
            src={currentFirst}
            alt=""
            onClick={(e) => {
              setIndex(currentFirstIndex);
              handleOpenCarousel();
              setDimensions(e);
            }}
          />
          <div className="products-content__pictures__preview">
            <ProductPreview
              items={currentVariant?.photos}
              setCurrentFirstIndex={setCurrentFirstIndex}
            />
          </div>
          <div className="products-content__pictures__other">
            {currentVariant?.photos.map((photo, index) => {
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
                      handleOpenCarousel();
                      setDimensions(e);
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
              <p>
                <Link to={"/"}>
                  <span className="products-content__details__options__path__link">
                    Home
                  </span>
                </Link>
                &bull; {productId ? data[parseInt(productId) - 1].name : ""} .{" "}
                {currentVariant?.variant}
              </p>
            </div>
            <div className="products-content__details__options__title">
              <h1>
                {productId ? data[parseInt(productId) - 1].name : ""} .{" "}
                {currentVariant?.variant}
              </h1>
            </div>
            <div className="products-content__details__options__price">
              <p>€{productId ? data[parseInt(productId) - 1].price : ""}</p>
            </div>
            <div className="products-content__details__options__variants">
              {currentVariant && (
                <Swatches id={productId} currentVariant={currentVariant} />
              )}
            </div>
            <div className="products-content__details__options__types">
              {data[productId ? parseInt(productId) - 1 : 0]?.type.map(
                (type, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentType(type);
                    }}
                    className={`${
                      isTypeAvailable(type) ? "" : "notAvailable"
                    } ${isCurrentType(type) ? "currentType" : ""}`}
                    disabled={!isTypeAvailable(type)}
                  >
                    {type}
                  </button>
                )
              )}
            </div>
            <div className="products-content__details__options__add">
              {currentVariant && (
                <AddCartBtn
                  location={"product"}
                  itemId={productId}
                  price={data[productId ? parseInt(productId) - 1 : 0].price}
                  currentType={currentType}
                  currentVariant={currentVariant?.variant}
                />
              )}
              <button className="products-content__details__options__add__btn">
                <img src={shopPay} alt="" />
              </button>
            </div>
          </div>
          <div className="products-content__details__infos ">
            {infosData.map((info, index) => {
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
      <section className="products-tabs" key={Math.floor(Math.random() * 66)}>
        <Tabs
          currentVariant={currentVariant}
          productId={productId ? parseInt(productId) : 0}
        />
      </section>
      <section className="products-reviews" key={currentVariant?.variant}>
        <Separator />
        {currentVariant && <Reviews reviews={currentVariant?.reviews} />}
      </section>
      <Footer />
    </div>
  );
}
