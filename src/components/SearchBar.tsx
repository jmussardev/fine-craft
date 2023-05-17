/* eslint-disable react-hooks/exhaustive-deps */
import cross from "./../assets/img/icons/cross-icon.svg";
import data from "./../data/products.json";
import debounce from "./../../utils/debounce";
import useDebounce from "./../../hooks/useDebounce";

import SearchLoader from "./SearchLoader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchItem from "./SearchItem";

interface item {
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
  //-- STATE
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

  return (
    <>
      <div
        className={`header__searchBar ${
          isSearchOpen ? "header__searchBar--open" : ""
        } `}
      >
        <form className={`header__searchBar__form  `}>
          <button>
            <div className="header__searchBar__form__search ">
              <div></div>
            </div>
          </button>
          <input
            type="text"
            value={searchIpt}
            placeholder="Search"
            onChange={(e) => {
              setSearchIpt(e.target.value);
              debouncedSearch();
            }}
            onBlur={() => handleClose()}
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
                <ul>
                  {result !== null ? (
                    result.length !== 0 ? (
                      result.map((item) => <SearchItem item={item} />)
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
                </ul>
                <Link
                  to={"#"}
                  style={{
                    textTransform: "uppercase",
                    padding: "1.3rem 1.7rem",
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
              </>
            )}
          </div>
        )}

        {/* //<--results-->// */}
      </div>
    </>
  );
}
