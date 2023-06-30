import Lottie from "lottie-react";
import lazyload from "./../assets/animation/lazyloader.json";

export default function Loader() {
  return (
    <div className="loader">
      <div className="loader__container">
        <Lottie animationData={lazyload} />
      </div>
    </div>
  );
}
