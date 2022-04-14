import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  // useref
  const emailRef = useRef(""); // string value empty thakbe
  const passwordRef = useRef("");
  const navigate = useNavigate();

  // jodi user registered hy then sign in/ login korbe

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  // reset password

  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  // error
  let errorElement; // for error
  let loadingElement;

  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }

  // loading

  if (loading) {
    loadingElement = <p>Loading...</p>;
  }

  // if user created
  if (user) {
    navigate("/home");
  }

  // handle submit
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(email, password);
  };

  const navigateToRegister = (event) => {
    navigate("/register");
  };

  const sendResetPassword = async () => {
    const email = emailRef.current.value;
    await sendPasswordResetEmail(email);
    alert("Sent email");
  };

  return (
    <div className="container w-50 mx-auto py-2">
      <h2 className="text-center text-primary"> Please Login</h2>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button
          variant="primary btn-primary w-50 mx-auto d-block p-2"
          type="submit"
        >
          Login
        </Button>
      </Form>
      {errorElement}
      {loadingElement}
      <p className="mt-3 fw-bold text-center">
        New to Genius Car ?
        <Link
          to="/register"
          onClick={navigateToRegister}
          className="text-primary px-3 fw-bold pe-auto text-decoration-none"
        >
          Please Register
        </Link>
      </p>
      <p className="mt-3 fw-bold text-center">
        Forgot Password ?
        <Link
          to="/register"
          onClick={sendResetPassword}
          className="text-primary px-3 fw-bold pe-auto text-decoration-none"
        >
          Reset Password
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
