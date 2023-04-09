/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { notify } from "./toast";
import "react-toastify/dist/ReactToastify.css";
import { validate } from "./validation";
import styles from "../Styles/SignUp.module.css";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "signup"));
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "isAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      notify("you have signed up successfully", "success");
    } else {
      notify("invalid data!", "error");
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });
    }
  };

  return (
    <>
      <div className={styles.loginbox}>
        <h1>SignUp</h1>
        <form onSubmit={submitHandler}>
          <div className={styles.userbox}>
            <input
              type="text"
              name="name"
              defaultValue={data.name}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            <label htmlFor="name">Username</label>
            {errors.name && touched.name && (
              <span className={styles.errormsg}>{errors.name}</span>
            )}
          </div>
          <div className={styles.userbox}>
            <input
              type="email"
              name="email"
              defaultValue={data.email}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            <label htmlFor="email">Email Address</label>
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
            <label htmlFor="password">Password</label>
            {errors.password && touched.password && (
              <span className={styles.errormsg}>{errors.password}</span>
            )}
          </div>
          <div className={styles.userbox}>
            <input
              type="password"
              name="confirmPassword"
              defaultValue={data.confirmPassword}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            {errors.confirmPassword && touched.confirmPassword && (
              <span className={styles.errormsg}>{errors.confirmPassword}</span>
            )}
          </div>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              name="isAccepted"
              defaultValue={data.isAccepted}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            <label htmlFor="isAccepted">I Accept Terms Of Privacy Policy</label>
            <br />
            {errors.isAccepted && touched.isAccepted && (
              <span className={styles.errormsg}>{errors.isAccepted}</span>
            )}
          </div>
          <div className={styles.formButtons}>
            <Link to="/login">Login</Link>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
