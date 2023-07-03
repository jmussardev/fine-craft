import { useSeenStore } from "../stores/Seen.store";
import data from "./../data/products.json";
import Itemm from "./Item";
import { ItemVariant, Item } from "../../config/types";

interface item {
  id: string;
  variant: string;
}

export default function SecondTab() {
  const seenContent = useSeenStore((state: any) => state.content);
  return (
    <div className="firstTab">
      <div className="firstTab__wrapper">
        {seenContent.map((item: item, i: number) => {
          const product = data.find(
            (product) => product.id === item.id
          ) as Item;
          const variant = product.variants.find(
            (variant: ItemVariant) => variant.variant === item.variant
          );
          if (!product || !variant) return;
          return (
            <div
              key={i}
              className="firstTab__wrapper__item"
              style={{
                justifyContent: `${seenContent < 3 ? "center" : "left"}`,
              }}
            >
              <Itemm
                id={product.id}
                title={product.name}
                price={product.price}
                variants={product.variants}
                currentVariant={variant}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
