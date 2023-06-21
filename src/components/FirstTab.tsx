import Item from "./Item";
import data from "./../data/products.json";
// import { ItemVariant } from "./../../config/types";

export default function FirstTab({
  currentVariant,
  productId,
}: {
  currentVariant: any;
  productId: number;
}) {
  const product = data[productId - 1];
  const variants = new Array(...product.variants);
  const currentIndex = product.variants.indexOf(currentVariant);

  variants.splice(currentIndex, 1);

  return (
    <div className="firstTab">
      <div className="firstTab__wrapper">
        {variants.map((variant, i) => (
          <div key={i} className="firstTab__wrapper__item">
            <Item
              id={productId.toString()}
              title={product.name}
              price={product.price}
              variants={product.variants}
              currentVariant={variant}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
