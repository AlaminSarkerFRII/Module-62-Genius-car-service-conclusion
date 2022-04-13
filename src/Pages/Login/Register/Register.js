import React from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./Register.css";

const Register = () => {
  //user create with email and password
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const navigateToLogin = (event) => {
    navigate("/login");
  };

  // jodi user toire hoy....take home a niye jao

  if (user) {
    navigate("/home");
  }

  // handle register form
  const handleRegister = (event) => {
    event.preventDefault();
    // console.log(event.target); // full formta accesshobe
    // console.log(event.target.email); // email k access kora
    // console.log(event.target.email.value); // email er value ta k access kora
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(email, password);
  };
  return (
    <div className="register-form">
      <h2 className="text-center py-3">Please Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="name" required />
        <input
          type="email"
          name="email"
          placeholder="enter your email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <input className="bg-info" type="submit" value="Register" />
      </form>
      <p>
        Already have an account ?
        <Link
          to="/login"
          onClick={navigateToLogin}
          className="text-danger px-3 fw-bold pe-auto text-decoration-none"
        >
          Please Login
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
