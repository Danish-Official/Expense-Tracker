import axios from 'axios'
import React, { useEffect, useState } from "react";
const BASE_URL = "http://localhost:5000/api/v1/";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function loginUser() {
    try {
      const userData = { email, password }
      const response = await axios.post(`${BASE_URL}login`, userData);
      if (response.status === 201) {
        alert("login successful");
        window.localStorage.setItem("token", response.data.data);
        window.localStorage.setItem("id", response.data.id);
        window.localStorage.setItem("loggedIn", true);
        window.location.href = "/MainPage";
      } else {
        alert("Something went wrong");
      }
      console.log('Response:', response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    loginUser();
  }
  const [enabler, setEnabler] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setEnabler(!enabler);
  }, [isChecked]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
    <div style= {{height: "20%", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <h1 style= {{color: "#FFB30D"}}>Budget Tracker</h1>
    </div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="page-toggler">
              Don't have an account? <a href="/sign-up">Sign Up</a> here
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
