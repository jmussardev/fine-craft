import React from "react";
import LinkToAll from "./LinkToAll";

const linkStyle: React.CSSProperties = {
  position: "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "90%",
  color: "#fff",
};

export default function Hero() {
  return (
    <>
      <div className="hero">
        <LinkToAll linkStyle={linkStyle}>
          <p>
            fine . lifestyle . accessories . with . down . to . earth .
            aesthetics . established . mvii . made . in . italy
          </p>
        </LinkToAll>
      </div>
    </>
  );
}
