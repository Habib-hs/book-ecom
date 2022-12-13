/* eslint-disable no-unused-expressions */


/* eslint-disable no-unused-vars */
import Layout from '../../component/layout/Layout'
import {useState}  from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import Signout from './Signout';
import { isAuthenticated } from '../../Auth';


function Signin() {

  const [values, setValues] = useState({
    name: JSON.parse(localStorage.getItem("user")) || null,
    password: "rrrrrr9",
    error: "",
    loading: false,
    redirectToReferrer: false
});
const navigate = useNavigate() 
const { name, password, loading, error, redirectToReferrer } = values;

const handleChange=(e)=>{
  setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));  
}

const handleSubmit=(e)=>{
e.preventDefault();

  fetch("http://127.0.0.1:9000/api/v1/login/", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      name,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data));
        setValues({
          ...values,
          redirectToReferrer: true
      });
       // navigate("/")
      
      }
    });   
}

const user =   JSON.parse(localStorage.getItem("user")) 

const redirectUser = () => {
  if (redirectToReferrer) {
      if ( user.role === true) {
           navigate("/admin/dashboard") ;
      } else {
        navigate("/user/dashboard") ;
      }
  }
  if (isAuthenticated()) {
     navigate("/")
  }
};



  return (
    <Layout title="SignIn" description='Signin here and start Order' 
    className="container col-md-6 mt-5 offset-md-2">
      
          <div>         
          <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input
                  
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={handleChange}
                  
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                   
                    type="password"
                    name='password'
                    className="form-control"
                    onChange={handleChange}

                />
            </div>
            <button type='submit' className="btn btn-primary">
                Submit
            </button>
         </form>
            {redirectUser()}
          </div>

        
     
    </Layout>
  )
}

export default Signin;





