import React, { useState, useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { validateEmail, validatePassword } from "../Signup/validator";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();
  const [loginMail, setLoginMail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isUserPresent = JSON.parse(localStorage.getItem("userMail"));
    if (isUserPresent) {
      history.replace("/");
    }
  }, [history]);

  const extractPayloadFromToken = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  const loginUser = async () => {
    try {
      setError("");

      const isValidMail = validateEmail(loginMail);
      if (isValidMail) {
        setError(isValidMail);
        return;
      }

      const isValidPassword = validatePassword(loginPassword);
      if (isValidPassword) {
        setError("Invalid Username or Password!");
        return;
      }

      const result = await axios.post(
        "https://my-whatsapp-mern-clone.herokuapp.com/api/loginUser",
        {
          email: loginMail,
          password: loginPassword,
        }
      );

      const token = result.data;
      let payload = extractPayloadFromToken(token);
      const userMail = payload["email"];
      const username = payload["username"];
      if (userMail) {
        localStorage.setItem("userMail", JSON.stringify(userMail));
      }
      if (username) {
        localStorage.setItem("newUser", JSON.stringify(username));
      }

      history.replace("/");
    } catch (ex) {
      console.log(ex);
      setError(
        ex.response ? ex.response.data : "Invalid UserName or Password!"
      );
    }
  };

  return (
    <div className="login">
      <div className="login__body">
        <div className="login__header">
          <div className="login__whatsapp__logo">
            <img src="/whatsappLogo.png" alt="whatsapp-logo" />
          </div>
          <div className="login__header__text">Whatsapp-Clone</div>
          <div className="login__header__text login__text__lower">Sign In</div>
        </div>
        <div className="login__form__wrapper">
          <div className="login__error">{error}</div>
          <div className="login__form">
            <input
              type="text"
              className="login__text"
              placeholder="Email"
              value={loginMail}
              onChange={(e) => {
                setError("");
                setLoginMail(e.target.value);
              }}
            />
          </div>
          <div className="login__form">
            <input
              type="password"
              className="login__text"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => {
                setError("");
                setLoginPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="login__submit">
          <div className="login__button" onClick={loginUser}>
            Sign In
          </div>
          <div className="login__createAccount">
            <Link to="/signup">
              <u>Create an account</u>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
