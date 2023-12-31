/* eslint-disable react-hooks/exhaustive-deps */

import useScrollLock from "../../hooks/useScrollLock";
import cross from "./../assets/img/icons/cross-icon.svg";
import data from "./../data/products.json";
import debounce from "./../../utils/debounce";
import useDebounce from "./../../hooks/useDebounce";

import SearchLoader from "./SearchLoader";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SearchItem from "./SearchItem";

interface item {
  id: string;
  name: string;
  price: number;
  photos: string[];
}

export default function SearchBar({
  isSearchOpen,
  setIsSearchOpen,
  searchIpt,
  setSearchIpt,
}: {
  isSearchOpen: boolean;
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchIpt: string;
  setSearchIpt: React.Dispatch<React.SetStateAction<string>>;
}) {
  //-- HOOKS
  const { unlockScroll } = useScrollLock();
  //-- STATES
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<item[] | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  //-- FUNCTION

  const handleSearch = () => {
    if (searchIpt === "" || searchIpt.split("").length === 1) {
      return;
    }

    setShowLoader(true);
    setIsLoading(true);
    try {
      const found = data.filter((x) => {
        return x.name.toLowerCase().includes(searchIpt.toLowerCase());
      });
      const result = found.map((item) => ({
        id: `${item.id}`,
        name: `${item.name}.${item.variants[0].variant}`,
        price: item.price,
        photos: [item.variants[0].photos[0], item.variants[0].photos[1]],
      }));

      setResult(result);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setShowResult(true), 500);
    }
  };
  const debouncedSearch = useDebounce(handleSearch);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleClose = () => {
    unlockScroll();
    setIsSearchOpen(false);
    setShowLoader(false);
    setShowResult(false);
    setSearchIpt("");
  };

  //-- EFFECT
  useEffect(() => {
    const reset = () => {
      setShowResult(false);
      setShowLoader(false);
    };
    if (searchIpt === "") reset();
  }, [searchIpt]);
  useEffect(() => {
    const handleResult = debounce(() => {
      setIsLoading(false);
    }, 500);
    if (isLoading === true) {
      handleResult();
    }
  }, [result, isLoading]);

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref.current || isSearchOpen === false) return;
    ref.current.focus();
  }, [isSearchOpen === true]);

  useEffect(() => {
    if (isSearchOpen === false) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement;
      const isButtonClosest = target.closest(".header__board__left__search");
      const isSearchBarClosest = target.closest(".header__searchBar");
      const isLargeButtonClosest = target.closest(
        ".item__picture__second__add--large"
      );
      const isSmallButtonClosest = target.closest(
        ".item__picture__second__add--small"
      );

      const condition =
        isButtonClosest === null
          ? isSearchBarClosest === null
            ? true
            : false
          : false;
      if (condition) {
        if (isLargeButtonClosest === null && isSmallButtonClosest === null)
          handleClose();
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isSearchOpen === true]);

  /**
   * -- RETURN --
   */
  return (
    <>
      <div
        // tabIndex={0}
        // ref={ref}
        className={`header__searchBar ${
          isSearchOpen ? "header__searchBar--open" : ""
        } `}
        // onBlur={() => {
        //   setIsSearchOpen(false);
        // }}
      >
        <form
          // tabIndex={0}
          className={`header__searchBar__form  `}
        >
          <button>
            <div className="header__searchBar__form__search ">
              <div></div>
            </div>
          </button>
          <input
            ref={ref}
            // autoFocus
            type="text"
            value={searchIpt}
            placeholder="Search"
            onChange={(e) => {
              setSearchIpt(e.target.value);
              debouncedSearch();
            }}
            // onBlur={() => handleClose()}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            <div className="header__searchBar__form__close ">
              <img src={cross} alt="" />
            </div>
          </button>
        </form>
        {/* //<--loader-->// */}
        {showLoader && (
          <div className="header__searchBar__loader">
            {isLoading && <SearchLoader />}
          </div>
        )}

        {/* //<--loader-->// */}
        {/* //<--results-->// */}
        {showResult && (
          <div className="header__searchBar__results">
            {searchIpt !== "" && isLoading === false && (
              <>
                <div className="header__searchBar__results__wrapper">
                  {result !== null ? (
                    result.length !== 0 ? (
                      <>
                        {" "}
                        <p
                          style={{
                            fontFamily: "playfair_displayregular",
                            fontWeight: "600",
                            letterSpacing: "0.05rem",
                            paddingBottom: ".5rem",
                            borderBottom: "1px white solid",
                          }}
                        >
                          Products
                        </p>{" "}
                        <ul className="header__searchBar__results__grid">
                          {result.map((item) => (
                            <SearchItem item={item} handleClose={handleClose} />
                          ))}
                        </ul>{" "}
                      </>
                    ) : (
                      <p>
                        No results for "
                        <span style={{ fontWeight: "bolder" }}>
                          {searchIpt}
                        </span>
                        "
                      </p>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <Link
                    to={"#"}
                    style={{
                      textTransform: "uppercase",
                      padding: "1.3rem 1.7rem",
                      marginBottom: "5rem",
                      border: "white 2px solid",
                      color: isHover ? "black" : "white",
                      backgroundColor: isHover ? "white" : "transparent",
                      fontWeight: "bolder",
                      transition: "all 250ms ease-in-out",
                      animation: "fade 250ms ease-in-out",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    see all products
                  </Link>
                </div>
              </>
            )}
          </div>
        )}

        {/* //<--results-->// */}
      </div>
    </>
  );
}
