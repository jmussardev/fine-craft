import { useCartStore } from "./../src/stores/Cart.store";
import isEqualObject from "./../utils/isEqualObject";
import { Item, ItemVariant, Content, ItemContainer } from "./../config/types";

export default function useCart() {
  const cartContent = useCartStore((state: any) => state.content);
  // const addItemToCart = useCartStore((state: any) => state.addItem);
  const updateContent = useCartStore((state: any) => state.updateContent);

  const addCart = (
    item: Item,
    currentType: string,
    currentVariant: ItemVariant
  ) => {
    if (!item || !currentType) return;
    const newItemContent: Content = {
      id: item?.id,
      variant: currentVariant?.variant,
      type: currentType,
    };
    //is cart empty ?
    if (cartContent.length !== 0) {
      const alreadyInCart = cartContent.find((item: ItemContainer) =>
        isEqualObject(item.content, newItemContent)
      );
      //is the item already in cart ?
      if (alreadyInCart) {
        //copy state of the item in the cart
        const newItem = alreadyInCart;
        //find position of the item in the cart
        const itemIndex = cartContent.indexOf(newItem);
        //create a updated version on the item
        const updatedItem = { ...newItem, quantity: newItem.quantity + 1 };
        //copy the cart content
        // eslint-disable-next-line prefer-const
        let newCart = cartContent;
        //replace in cart the old item by the updated one
        newCart[itemIndex] = updatedItem;
        //update the cart state
        updateContent(newCart);
        //update the local storage
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        const newCart = [
          ...cartContent,
          { content: newItemContent, quantity: 1 },
        ];
        updateContent(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    } else {
      const newCart = { content: newItemContent, quantity: 1 };
      updateContent([newCart]);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  const removeCart = (cartItem: Content) => {
    const itemContent: Content = cartItem;
    const found = cartContent.find((item: ItemContainer) =>
      isEqualObject(item.content, itemContent)
    );
    console.log(found);
    if (!found) return;
    const itemIndex = cartContent.indexOf(found);
    console.log(itemIndex);
    // eslint-disable-next-line prefer-const
    let newCart = cartContent;
    newCart.splice(newCart[itemIndex], 1);
    console.log(newCart);
    updateContent(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return { addCart, removeCart };
}
