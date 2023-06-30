import React, { useEffect, useState } from "react";
import axios from 'axios'
const BASE_URL = "http://localhost:5000/api/v1/";

export default function RegistrationModal(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser() {
    try {
      const userData = { fname, lname, email, password }
      const response = await axios.post(`${BASE_URL}register`, userData);
      if (response.status === 200) {
        alert("Registration Successful");
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
    registerUser();
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
      <div style={{ height: "20%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px"}}>
        <h1 style={{ color: "#FFB30D" }}>Budget Tracker</h1>
      </div>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => setFname(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>

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

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="page-toggler">
              Already registered?<a href="/sign-in"> sign in</a> here
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
