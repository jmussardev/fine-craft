import brand from "./../assets/img/footer/brand-initials.svg";
import motto from "./../assets/img/footer/HOLD.svg";

export default function Footer() {
  return (
    <section className="footer">
      <div className="footer__wrapper">
        <div className="footer__brand">
          <img src={brand} alt="" />
        </div>
        <h2>finecraft | hold on to the good</h2>
        <p>Inspired from borrowed design for study purpose.</p>
        <div className="footer__motto">
          <img src={motto} alt="" />
        </div>
      </div>
    </section>
  );
}
