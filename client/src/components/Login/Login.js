import React, { useEffect, useState } from "react";
import { login, signup } from "../../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './Login.css'
const Login = () => {
  const [signUpPage, setSignUpPage] = useState(false);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    setPassword("");
    const authToken = localStorage.getItem("token");
    if (authToken) {
      history("/homepage");
    }
    setTimeout(() => {
      setShowPassword(false);
    }, 100);
  }, []);

  const handleSignUpButton = (value) => {
    setSignUpPage(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userName) {
      toast.error("Please enter your username!");
      return;
    } else if (!password) {
      toast.error("Please enter your password!");
      return;
    }
    const data = await login(userName, password);
    if (data) {
      toast.success("User login successfully!");
      history("/homepage");
    }

    console.log(data);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!userName) {
      toast.error("Please enter your username!");
      return;
    } else if (!password) {
      toast.error("Please enter your password!");
      return;
    } else if (!name) {
      toast.error("Please enter your name!");
      return;
    } else if (!email) {
      toast.error("Please enter your email!");
      return;
    } else if (email && !emailRegex.test(email)) {
      toast.error("Email Id Not Valid!");
      return;
    }
    const data = await signup(userName, password, name, email);
    if (data) {
      toast.success("User signup successfully!");
      setSignUpPage(false);
    }

    console.log(data);
  };
  return (
    <div className={signUpPage ? "container sign-up-mode" : "container"}>
      <div className="forms-container">
        <div className="signin-signup">
          <div className="sign-in-form login-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="off"
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <i
                className="fas fa-eye eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn solid" onClick={(e) => handleLogin(e)}>
              Login
            </button>
          </div>

          <div action="" className="sign-up-form login-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <i
                className="fas fa-eye eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn solid" onClick={(e) => handleSignUp(e)}>
              Sign up
            </button>
          </div>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Enter your personal details and start journey with us.</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => handleSignUpButton(true)}
            >
              Sign up
            </button>
          </div>

          <img src="img/log.svg" className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Sign in with your account details and begin your journey with us.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => handleSignUpButton(false)}
            >
              Sign in
            </button>
          </div>

          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
