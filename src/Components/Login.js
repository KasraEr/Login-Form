/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { notify } from "./toast";
import "react-toastify/dist/ReactToastify.css";
import { validate } from "./validation";
import styles from "../Styles/Login.module.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "login"));
  }, [data, touched]);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      notify("you have logged in successfully", "success");
    } else {
      notify("invalid data!", "error");
      setTouched({
        email: true,
        password: true,
      });
    }
  };

  return (
    <>
      <div className={styles.loginbox}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className={styles.userbox}>
            <input
              type="email"
              name="email"
              defaultValue={data.email}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            <label>Email Address</label>
            {errors.email && touched.email && (
              <span className={styles.errormsg}>{errors.email}</span>
            )}
          </div>
          <div className={styles.userbox}>
            <input
              type="password"
              name="password"
              defaultValue={data.password}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            <label>Password</label>
            {errors.password && touched.password && (
              <span className={styles.errormsg}>{errors.password}</span>
            )}
          </div>
          <div className={styles.formButtons}>
            <Link to="/signup">Sign Up</Link>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
