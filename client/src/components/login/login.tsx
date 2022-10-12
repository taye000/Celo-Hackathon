import React, { useState, useContext, FormEvent } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";

export function Login() {
  const { login } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else if (passwordType === "text") {
      setPasswordType("password");
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    //validate login
    if (!phoneNumber || !password) {
      console.log("Please input phone number and password");
    }
    await login({
      phoneNumber,
      password,
    });

    navigate("/Home");
  };

  return (
    <div className="container-B">
      <div className="container-image">
        <image className="bg-image">
          <img src={require("../../assets/celo.png")} alt="celo"></img>
        </image>
      </div>
      <div className="container-">
        <div className="box">
          <div className="login-header">SWAP CRYPTO</div>
          <div>
            <input
              type="text"
              placeholder="phone number"
              className="input-phoneNo"
              onChange={(e) => setPhoneNumber(e.target.value.trim())}
            />
          </div>
          <div>
            <input
              type={passwordType}
              placeholder="password"
              className="input-password"
              onChange={(e) => setPassword(e.target.value.trim())}
              {...handlePasswordChange}
            />{" "}
          </div>
          <div className="button-container">
            <div>
              <Link to="/">
                {" "}
                <button onClick={handleLogin} className="button">
                  Login
                </button>
              </Link>
              <button onClick={togglePassword} className="checkboxButton">
                Show password
              </button>
            </div>
          </div>{" "}
          <div className="reg">
            <div className="reg-text">Don’t have an account?</div>
            <Link to="/register">
              <button className="reg-btn"> Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
