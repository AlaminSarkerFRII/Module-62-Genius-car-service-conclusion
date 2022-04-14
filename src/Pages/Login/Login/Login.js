import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
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

  // error
  let errorElement; // for error
  let loadingElement;

  if (error) {
    errorElement = (
      <div>
        <p className="text-danger">Error: {error?.message}</p>
      </div>
    );
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
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {errorElement}
      {loadingElement}
      <p>
        New to Genius Car ?
        <Link
          to="/register"
          onClick={navigateToRegister}
          className="text-danger px-3 fw-bold pe-auto text-decoration-none"
        >
          Please Register
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
