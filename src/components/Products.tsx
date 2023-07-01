import products from "./../data/products.json";
import Item from "./Item";

export default function Products() {
  return (
    <div className="products">
      {products.map((product, i) => (
        <div key={i}>
          <Item
            id={product.id}
            title={product.name}
            price={product.price}
            variants={product.variants}
            currentVariant={product.variants[0]}
          />
        </div>
      ))}
      {/* <Item
        id={products[0].id}
        title={products[0].name}
        price={products[0].price}
        variants={products[0].variants}
        currentVariant={products[0].variants[0]}
      /> */}
    </div>
  );
}
