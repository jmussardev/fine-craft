import products from "./../data/products.json";
import Item from "./Item";

export default function Products() {
  return (
    <div className="products">
      <Item
        img={products[0].variants[0].photos[0]}
        secondImg={products[0].variants[0].photos[1]}
        title={products[0].name}
        price={products[0].price}
        variants={products[0].variants}
      />
      <Item
        img={products[0].variants[0].photos[0]}
        secondImg={products[0].variants[0].photos[1]}
        title={products[0].name}
        price={products[0].price}
        variants={products[0].variants}
      />
      <Item
        img={products[0].variants[0].photos[0]}
        secondImg={products[0].variants[0].photos[1]}
        title={products[0].name}
        price={products[0].price}
        variants={products[0].variants}
      />
      <Item
        img={products[0].variants[0].photos[0]}
        secondImg={products[0].variants[0].photos[1]}
        title={products[0].name}
        price={products[0].price}
        variants={products[0].variants}
      />
      <Item
        img={products[0].variants[0].photos[0]}
        secondImg={products[0].variants[0].photos[1]}
        title={products[0].name}
        price={products[0].price}
        variants={products[0].variants}
      />
      <Item
        img={products[0].variants[0].photos[0]}
        secondImg={products[0].variants[0].photos[1]}
        title={products[0].name}
        price={products[0].price}
        variants={products[0].variants}
      />
    </div>
  );
}
