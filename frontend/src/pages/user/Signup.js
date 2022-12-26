/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    setValues({ ...values, error: false });
    fetch("http://127.0.0.1:9000/api/v1/signup/", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 'success') {
          setValues({ ...values, error: data.message, success: false });
      } else {
          setValues({
              ...values,
              name: '',
              email: '',
              password: '',
              error: '',
              success: true
          });
      }

        
      });
  };
  
  const showError = () => (
    <div className="alert alert-danger mt-3"  style={{ display: error ? "" : "none" }} >
        {error}
    </div>
);

const showSuccess = () => (
    <div className="alert alert-info"  style={{ display: error ? "" : "none" }} >
        New account is created. Please <Link to="/signin">Signin</Link>
    </div>
);

  return (
    <Layout
      title="Signup"
      description="Signup to Node React E-commerce App"
      className="container col-md-6 mt-5 offset-md-2"
    >
      <div style={{"width": "100%", "height": "400px"}}>
       {showSuccess()}
       {showError()}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4 mb-5">
            Submit
          </button>
      
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
