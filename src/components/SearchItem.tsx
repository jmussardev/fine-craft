import { Link } from "react-router-dom";

interface item {
  name: string;
  price: number;
  photos: string[];
}
export default function SearchItem({ item }: { item: item }) {
  return (
    <>
      <li>
        <Link to={"#"}>
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
