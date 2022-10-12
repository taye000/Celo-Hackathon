import React, { useContext, useState } from "react";
import "./register.css";
import "../login/login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";

export function Register() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const handlePasswordChange = (e: any) => {
    setPasswordType(e.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else if (passwordType === "text") {
      setPasswordType("password");
    }
  };

  const handleUserRegister = async (e: any) => {
    e.preventDefault();

    // validate
    if (!username) {
      console.log("please provide username");
    } else if (!phoneNumber) {
      console.log("please provide phoneNumber");
    } else if (!email) {
      console.log("please provide email");
    } else if (!password) {
      console.log("please provide password");
    }

    register({
      username,
      phoneNumber,
      email,
      password,
    });

    navigate("/");
  };
  return (
    <div className="container-B">
      <div className="container-image">
        <image className="bg-image">
          <img src={require("../../assets/celo.png")} alt="celo"></img>
        </image>
      </div>
      <div className="container-">
        <div className="register-top-vector3"></div>
        <header className="register_header">SWAP CRYPTO</header>
        <div>
          <input
            type="text"
            placeholder="user name"
            className="register-username"
            onChange={(e) => setUsername(e.target.value.trim())}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone number"
            className="register-phnumber"
            onChange={(e) => setPhoneNumber(e.target.value.trim())}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="E-mail"
            className="register-email"
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </div>
        <div>
          <input
            type={passwordType}
            placeholder="password"
            className="register-password"
            onChange={(e) => setPassword(e.target.value.trim())}
            {...handlePasswordChange}
          />
        </div>
        <div>
        <button onClick={togglePassword} className="checkboxButton">
            Show password
          </button>

        </div>

        <div className="button-container">
          <div>
            <Link to="/">
              {" "}
              <button
                onClick={handleUserRegister}
                className="button"
                style={{ top: "100px", left: "220px" }}
              >
                Register
              </button>
            </Link>
          </div>
        </div>
        <div className="lg-container">
          <div className="log-text">Already have an account?</div>
          <a href="/">
            <button className="log-btn">Sign-in</button>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Register;
