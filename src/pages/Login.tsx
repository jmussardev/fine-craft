import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [input, setInput] = useState("");
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__container__form">
          <div className="login__container__form__header">
            <div className="login__container__form__header__logo"></div>
          </div>
          <h1>Log in</h1>
          <p>Enter your email and we"ll send you a login code</p>
          <label htmlFor="email">Email</label>
          <input
            autoFocus
            name="email"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Link to={"/"}>
            <button
              className={`${input === "" ? "disabled" : ""}`}
              disabled={input === "" ? true : false}
            >
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
