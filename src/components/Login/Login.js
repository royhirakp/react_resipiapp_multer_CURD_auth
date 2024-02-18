import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import Loader from '../Loader';
// import Coockie from 'js-coocki'
import Loader from "../Card/Loder";
import "./Login.css";

const Login = (props) => {
  const [inputEmail, setInputaEmail] = useState("");
  const [inputPassword, setInputaPassword] = useState("");
  const navgate = useNavigate();
  const [errorMessege, setErrorMessege] = useState("");
  const [loader, setLoder] = useState(false);
  // const [checkboxStatus, setCheckboxStatus] = useState(null)
  const [emailValidaion, setEmailValidation] = useState(false);
  const [passWValidaion, setPassWValidation] = useState(false);

  //email and password validation
  useEffect(() => {
    if (/[0-9]/.test(inputPassword) && /[~!@#$%^&*]/.test(inputPassword))
      setPassWValidation(false);
    else if (inputPassword.length > 2) setPassWValidation(true);
    else if (inputPassword.length === 0) setPassWValidation(false);

    if (/[@]/.test(inputEmail) && /[.]/.test(inputEmail))
      setEmailValidation(false);
    else if (inputEmail.length === 0) setEmailValidation(false);
    else setEmailValidation(true);
  }, [inputEmail, inputPassword]);

  //Onsubmit function
  async function onsunmitFun(e) {
    e.preventDefault();

    setLoder(true);
    try {
      const body = {
        email: inputEmail,
        password: inputPassword,
      };
      console.log("api call start");

      let res = await axios.post(
        "https://api-recipe-dpfc.onrender.com/api/v1/user/login",
        body
      );
      setErrorMessege("");
      console.log(res);
      console.log(res.data.token, "<<<<<token");
      localStorage.setItem("logToken", res.data.token);
      localStorage.setItem("userID", inputEmail.split("@")[0]);
      navgate("./home");
      // // coocki
      // document.cookie = 'SEmail'+inputEmail+";path=http://localhost:3000"
      // document.cookie = 'Spassword'+inputPassword+";path=http://localhost:3000"
    } catch (error) {
      setErrorMessege(error.response.data.status);
    }
    setLoder(false);
  }

  return (
    <div className="loginBody">
      <div className="Login-container">
        <p style={{ textAlign: "center" }}>
          <b>Sing In</b>
        </p>
        <form onSubmit={onsunmitFun}>
          <br />
          Email Address:
          <input
            type="email"
            placeholder="Enter email"
            style={{ border: emailValidaion ? "red 4px solid" : "" }}
            onChange={(e) => setInputaEmail(e.target.value)}
          />
          <br />
          {emailValidaion ? (
            <p style={{ color: "red" }}>not a valid email</p>
          ) : (
            <></>
          )}
          <br />
          Password
          <input
            type="password"
            placeholder="Enter password"
            style={{ border: passWValidaion ? "red 4px solid" : "" }}
            onChange={(e) => setInputaPassword(e.target.value)}
          />
          <br />
          <small
            style={{
              color: "red",
            }}
          >
            NB* for test : email : "12@12.com"
            <br />
            password: "12@12.com"
          </small>
          <br /> <br />
          <div className="chekboxRemberme">
            <input
              type="checkbox"
              // onClick={(e)=>{setCheckboxStatus(e.target.checked)}}
            />{" "}
            <p>Remember me? </p>
            <br />
          </div>
          {
            // passWValidaion ? <p style={{color:"red"}}>not a valid password</p>: <></>
          }
          <button
            // style={{"margin":"0px 50px 0px 50px;"}}
            className="submitButton"
            style={{ width: "100%" }}
            type="submit"
          >
            Submit
          </button>
        </form>
        Forgot <a href="http://ww.ckc.co">Password?</a>
        <br />
        <Link to="/register">SingUp</Link>
        {errorMessege ? (
          <h3 style={{ color: "red" }}>User Does not exist, please register</h3>
        ) : (
          ""
        )}
        {loader ? <Loader /> : <></>}
      </div>
    </div>
  );
};

export default Login;
