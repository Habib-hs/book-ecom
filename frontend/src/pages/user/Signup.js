
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Layout from "../../component/layout/Layout";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    
    const { name, email, password, error } = values;
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
        console.log(data, "userRegister");
      });
  };

  return (
    <Layout
      title="Signup"
      description="Signup to Node React E-commerce App"
      className="container col-md-6 mt-5 offset-md-2"
    >
      <div>
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
          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
