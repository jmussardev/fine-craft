import React from "react";
import { Link } from "react-router-dom";

export default function LinkToAll({
  children,
  linkStyle,
}: {
  children: React.ReactNode;
  linkStyle?: object;
}) {
  return (
    <Link to={"#"} style={linkStyle}>
      <div className="linkToAll">
        {children}
        <span className="linkToAll__arrow">&gt;</span>
      </div>
    </Link>
  );
}
