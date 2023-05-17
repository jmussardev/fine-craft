interface item {
  name: string;
  price: number;
  photos: string[];
}
export default function SearchItem({ item }: { item: item }) {
  return (
    <>
      <li>
        <div className="searchItem">
          <div className="searchItem__picture">
            <img src={item.photos[0]} alt="" />
            <img src={item.photos[1]} alt="" />
          </div>

          <p>{item.name}</p>
          <p>€{item.price} EUR</p>
        </div>
      </li>
    </>
  );
}
