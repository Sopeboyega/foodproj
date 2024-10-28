import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import Loader from "../Loader/Loader";


const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken,token ,loading,setLoading} = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
  event.preventDefault();
 setLoading(true)
 console.log(loading)
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setLoading(false)
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  // useEffect(() => {
  //  console.log(data)

  // }, [data])

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => {
              setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="button">
        <button type="Sumbit">
          {loading ? <Loader/> : <></>}
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        </div>
       
        {currState == "Sign Up" ? (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        ) : (
          <></>
        )}

        {currState === "Login" ? (
          <p>
            Create a new account{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span> .
          </p>
        ) : (
          <p>
            Already Have an Account{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span> .
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
