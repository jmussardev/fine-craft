import { useState } from "react";
import check from "./../assets/img/icons/bx-check.svg";
import { useQuickAddStore } from "../stores/QuickAdd.store";
import { useCartStore } from "../stores/Cart.store";

import debounce from "../../utils/debounce";

export default function AddCartBtn({ location }: { location: string }) {
  const [isLoading, setIstLoading] = useState(false);
  const [isValided, setIsValided] = useState(false);
  const setIsOpen = useQuickAddStore((state: any) => state.setIsOpen);
  const setCartOpen = useCartStore((state: any) => state.setIsOpen);
  const handleAddCart = () => {
    setIstLoading(true);
    debounce(() => {
      setIstLoading(false);
      setIsValided(true);
      debounce(() => {
        setIsOpen(false);
        setCartOpen(true);
        setIsValided(false);
      }, 500)();
    }, 1000)();

    //     if (!item || !currentType || !currentVariant) return;
    //     addItem(item.id, item.price, currentType, currentVariant.variant);
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
