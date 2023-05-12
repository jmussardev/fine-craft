import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import observer from "../../utils/observer";

export default function LinkToAll({
  children,
  linkStyle,
}: {
  children: React.ReactNode;
  linkStyle?: object;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    observer("linkToAll__animation", ref);
  }, []);
  return (
    <Link to={"#"} style={linkStyle}>
      <div ref={ref} className="linkToAll">
        {children}
        {/* <span className="linkToAll__arrow">&gt;</span> */}
      </div>
    </Link>
  );
}
