import { Link } from "react-router-dom";
import data from "./../data/products.json";

interface item {
  id: string;
  name: string;
  price: number;
  photos: string[];
}
export default function SearchItem({
  item,
  handleClose,
}: {
  item: item;
  handleClose: () => void;
}) {
  const variant = data[parseInt(item.id) - 1].variants[0].variant;
  return (
    <>
      <li onClick={() => handleClose()}>
        <Link to={`/products/${item.id}/${variant}`}>
          <div className="searchItem">
            <div className="searchItem__picture">
              <img src={item.photos[0]} alt="" />
              <img src={item.photos[1]} alt="" />
            </div>
            <div className="searchItem__description">
              <p className="searchItem__description__name">{item.name}</p>
              <p className="searchItem__description__price">
                €{item.price} EUR
              </p>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}
