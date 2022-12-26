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
    redirectToReferrer: false,
});
const [validuser, setValidUser] = useState(true)
const navigate = useNavigate() 
const { name, password, loading, error, redirectToReferrer } = values;

const handleChange=(e)=>{
  setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));  
}

const handleSubmit=(e)=>{
e.preventDefault();
setValues({ ...values, error: false, loading: true });

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
     
      
      } else {
        console.log(data)
        setValues({ ...values, error: "Wrong username or password", loading: false });
        console.log(values)
      }
    })
    .catch( setValidUser(false))  
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

const showLoading = () =>
loading && (
    <div className="alert alert-info">
        <h2>Loading...</h2>
    </div>
);

const showError = () => (
  <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
  >
      {error}
  </div>
);


  return (
    <Layout title="SignIn" description='Signin here and start Order' >
      
          <div className='container' >  
          <div className='row'>

            <div className='col-6 align-self-center mt-5'  style={{"width": "50%", "height": "400px"}}>
            {showLoading()}
          {showError()}       
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
            <button type='submit' className="btn btn-primary mt-3">
                Submit
            </button>
         </form>
       
            {redirectUser()}
            </div>
             
             <div className='col me-5 mt-2 p-5'>
               <div className='bg-grey'>
                       <h4>For Admin Login</h4>
                       <p>Username : admin <br/>Password: admin </p>

                       <h4>For User Login</h4>
                       <p>Username : habib <br/>Password: habib </p>
                      
                      
               </div>
             </div>




          </div>
          </div>
     
    </Layout>
  )
}

export default Signin;





