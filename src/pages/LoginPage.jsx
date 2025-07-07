import React from 'react';
import './LoginPage.css';
import { FcGoogle } from 'react-icons/fc';
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome back</h2>

        <form className="login-form">
          <label className="login-label">
            Email <span className="text-red-500">*</span>
            <input
              type="email"
              placeholder="name@email.com"
              className="login-input"
              required
            />
          </label>

          <label className="login-label">
            Password <span className="text-red-500">*</span>
            <div className="password-wrapper">
              <input
                type="password"
                placeholder="Enter your password"
                className="login-input"
                required
              />
              <span className="eye-icon"></span>
            </div>
          </label>

          <div className="forgot-password">
<Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="separator">or</div>

        <div className="social-buttons">
          <button className="social-button">
            <FcGoogle className="icon" /> Continue with Google
          </button>
          
        </div>

        <p className="signup-text">
  New to LearnSphere? <Link to="/signup">Sign up</Link>
</p>

      </div>
    </div>
  );
};

export default LoginPage;