import React, { useState, useEffect } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { validateEmail, validateUserName, validatePassword } from "./validator";
import { useHistory } from "react-router";

const SignUp = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupMail, setSignupMail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const isUserPresent = JSON.parse(localStorage.getItem("userMail"));
    if (isUserPresent) {
      history.replace("/");
    }
  }, [history]);

  const selectUserImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (eve) => {
        setUserImage(eve.target.result);
        localStorage.setItem("userImage", eve.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createNewAccount = async () => {
    try {
      setError("");
      const isValidUserName = validateUserName(signupUsername);
      if (isValidUserName) {
        setError(isValidUserName);
        return;
      }
      const isValidMail = validateEmail(signupMail);
      if (isValidMail) {
        setError(isValidMail);
        return;
      }
      const isValidPassword = validatePassword(signupPassword);
      if (isValidPassword) {
        setError(isValidPassword);
        return;
      }
      if (userImage === "") {
        setError("Please upload your image!");
        return;
      }

      await axios.post(
        "https://my-whatsapp-mern-clone.herokuapp.com/api/addUser",
        {
          username: signupUsername,
          email: signupMail,
          password: signupPassword,
        }
      );

      history.replace("/login");
    } catch (ex) {
      setError(ex.response.data ? ex.response.data : "Invalid Credentials!");
    }
  };

  return (
    <div className="signup">
      <div className="signup__body">
        <div className="signup__header">
          <div className="signup__whatsapp__logo">
            <img src="/whatsappLogo.png" alt="whatsapp-logo" />
          </div>
          <div className="signup__header__text">Whatsapp-Clone</div>
          <div className="signup__header__text signup__text__lower">
            Sign Up
          </div>
        </div>
        <div className="signup__form__wrapper">
          <div className="signup__error">{error}</div>
          <div className="signup__form">
            <input
              type="text"
              className="signup__text"
              placeholder="Username"
              value={signupUsername}
              onChange={(e) => {
                setError("");
                setSignupUsername(e.target.value);
              }}
            />
          </div>
          <div className="signup__form">
            <input
              type="text"
              className="signup__text"
              placeholder="Email"
              value={signupMail}
              onChange={(e) => {
                setError("");
                setSignupMail(e.target.value);
              }}
            />
          </div>
          <div className="signup__form">
            <input
              type="password"
              className="signup__text"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => {
                setError("");
                setSignupPassword(e.target.value);
              }}
            />
          </div>
          <div className="signup__forms">
            {userImage === "" ? (
              <div>
                <div className="signup__avatar__text">Upload User Image</div>
                <input
                  type="file"
                  placeholder="Insert User Image.."
                  onChange={selectUserImage}
                />
              </div>
            ) : (
              <div className="signup__userImage">
                <img src={userImage ? userImage : ""} alt="userImage" />
              </div>
            )}
          </div>
        </div>
        <div className="signup__submit">
          <div className="signup__button" onClick={createNewAccount}>
            Sign Up
          </div>
          <div className="signup__createAccount">
            <Link to="/login">
              <u>Click here to Sign In</u>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
