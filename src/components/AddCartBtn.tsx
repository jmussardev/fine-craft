import { useState } from "react";
import check from "./../assets/img/icons/bx-check.svg";
import { useQuickAddStore } from "../stores/QuickAdd.store";
import { useCartStore } from "../stores/Cart.store";

import debounce from "../../utils/debounce";
import useScrollLock from "../../hooks/useScrollLock";
import useCart from "../../hooks/useCart";

export default function AddCartBtn({
  location,
  itemId,
  price,
  currentType,
  currentVariant,
}: {
  itemId?: string;
  price?: number;
  currentType: string | null;
  currentVariant: string;
  location: string;
}) {
  const { addItem } = useCart();

  const [isLoading, setIstLoading] = useState(false);
  const [isValided, setIsValided] = useState(false);
  const setIsOpen = useQuickAddStore((state: any) => state.setIsOpen);
  const setCartOpen = useCartStore((state: any) => state.setIsOpen);
  const { lockScroll } = useScrollLock();
  const handleAddCart = () => {
    setIstLoading(true);
    debounce(() => {
      setIstLoading(false);
      setIsValided(true);
      debounce(() => {
        lockScroll();
        setIsOpen(false);
        setCartOpen(true);
        setIsValided(false);
      }, 500)();
    }, 1000)();

    if (!itemId || !price || !currentType || !currentVariant) return;
    addItem(itemId, price, currentType, currentVariant);
  };
  return (
    <button
      className={` addCart-btn addCart-btn--${location} `}
      onClick={handleAddCart}
    >
      {isLoading ? (
        <div className={`loader-wrapper`}>
          <div className="loader-wrapper__lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : isValided ? (
        <div className={`loader-wrapper loader-wrapper--isValided`}>
          <img src={check} alt="" />
        </div>
      ) : (
        "add to cart"
      )}
    </button>
  );
}
