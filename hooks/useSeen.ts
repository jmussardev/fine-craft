import { useSeenStore } from "./../src/stores/Seen.store";

import isEqualObject from "./../utils/isEqualObject";
import { ItemSeenContainer } from "./../config/types";

export default function useSeen() {
  const seenContent = useSeenStore((state: any) => state.content);
  const updateContent = useSeenStore((state: any) => state.updateContent);

  const addItem = (itemId: string, currentVariant: string) => {
    const newItem: ItemSeenContainer = {
      id: itemId,
      variant: currentVariant,
    };
    //is seen empty ?
    if (seenContent.length !== 0) {
      const alreadyInCart = seenContent.find((item: ItemSeenContainer) =>
        isEqualObject(item, newItem)
      );
      // console.log("seen hook :");
      // console.log(seenContent);
      //is the item already in seen ?
      if (alreadyInCart) return;
      const newSeen = [...seenContent, newItem];
      updateContent(newSeen);
      localStorage.setItem("seen", JSON.stringify(newSeen));
    } else {
      updateContent([newItem]);
      localStorage.setItem("seen", JSON.stringify([newItem]));
    }
  };
  //   const removeItem = (cartItem: Content) => {
  //     const itemContent: Content = cartItem;
  //     const found = cartContent.find((item: ItemContainer) =>
  //       isEqualObject(item.content, itemContent)
  //     );
  //     const itemIndex = cartContent.indexOf(found);
  //     cartContent.splice(itemIndex, 1);
  //     localStorage.setItem("cart", JSON.stringify(cartContent));
  //   };

  //   const removeOne = (cartItem: ItemContainer) => {
  //     const found = cartContent.find((item: ItemContainer) =>
  //       isEqualObject(item.content, cartItem.content)
  //     );
  //     if (!found) return;
  //     if (found.quantity === 0) return;
  //     const itemIndex = cartContent.indexOf(found);
  //     const updatedItem = { ...cartItem, quantity: cartItem.quantity - 1 };
  //     // eslint-disable-next-line prefer-const
  //     let newCart = cartContent;
  //     newCart[itemIndex] = updatedItem;
  //     updateContent(newCart);
  //     localStorage.setItem("cart", JSON.stringify(newCart));
  //   };

  return { addItem };
}
