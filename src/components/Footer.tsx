import observer from "../../utils/observer";
import brand from "./../assets/img/footer/brand-initials.svg";
import motto from "./../assets/img/footer/HOLD.svg";
import { useEffect, useRef } from "react";

export default function Footer() {
  const bgRef = useRef<HTMLDivElement>(null);
  const mottoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    observer("footer__background__animation", bgRef);
    observer("footer__wrapper__motto__animation", mottoRef);
  }, []);

  return (
    <section className="footer">
      <div ref={bgRef} className="footer__background"></div>
      <div className="footer__wrapper">
        <div className="footer__wrapper__brand">
          <img src={brand} alt="" />
        </div>
        <h2>finecraft | hold on to the good</h2>
        <p>Inspired from borrowed design for study purpose.</p>
        <div ref={mottoRef} className="footer__wrapper__motto">
          <img src={motto} alt="" />
        </div>
      </div>
    </section>
  );
}
