import products from "./../data/products.json";
import Item from "./Item";

export default function Products() {
  // console.log(products);
  return (
    <div className="products">
      <Item
        id={products[0].id}
        title={products[0].name}
        price={products[0].price}
        variants={products[0].variants}
      />
    </div>
  );
}
