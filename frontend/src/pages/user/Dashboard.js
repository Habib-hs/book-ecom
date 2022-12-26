/* eslint-disable no-unused-vars */
import React , {useState, useEffect} from 'react'
import Layout from '../../component/layout/Layout'
import { Link } from 'react-router-dom'
import { getPurchaseHistory } from './ApiUser'
import moment from 'moment'

function Dashboard() {
    const [history, setHistory] = useState([]);


const user =   JSON.parse(localStorage.getItem("user")) 
const token = user.token;  
const userId = user._id;
const name = user.name;
const email = user.email;
const role = user.role;


const init = (userId, token) => {
    getPurchaseHistory(userId, token).then(data => {
        console.log(history)
        if (data.error) {
            console.log(data.error);
        } else {
            setHistory(data);
        }
    });
};

useEffect(() => {
    init( userId, token);
}, []);


const userInfo=()=>{
  return(
  <div className="card mb-5">
  <h3 className="card-header bg-primary text-white">User Information</h3>
  <ul className="list-group">
      <li className="list-group-item">{user.name}</li>
      <li className="list-group-item">{user.email}</li>
      <li className="list-group-item">
          {user.role === 1 ? "Admin" : "Registered User"}
      </li>
  </ul>
</div>
)
}

const userLinks = () => {
  return (
      <div className="card">
          <h4 className="card-header bg-primary text-white">User Links</h4>
          <ul className="list-group">
              <li className="list-group-item">
                  <Link className="nav-link" to="/cart">
                      My Cart
                  </Link>
              </li>
              <li className="list-group-item">
                  <Link className="nav-link" to={`/profile/${userId}`}>
                      Update Profile
                  </Link>
              </li>
          </ul>
      </div>
  );
};

const purchaseHistory = history => {
    return (
        <div className="card mb-5">
            <h3 className="card-header bg-primary text-white">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {history.map((h, i) => {
                        return (
                            <div key={i}>
                                <hr />
                                {h.products.map((p, i) => {
                                    return (
                                        <div key={i}>
                                            <h6>Product name: {p.name}</h6>
                                            <h6>
                                                Product price: ${p.price}
                                            </h6>
                                            <h6>
                                                Purchased date:{" "}
                                                {moment(
                                                    p.createdAt
                                                ).fromNow()}
                                            </h6>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};


  return (
          <Layout title="DashBoard" description={`Good Day ${user.name}!`}
          className="container-fluid">
            <div className='container'>
        <div className="row">
                <div className="col-3 mt-5">{userLinks()}</div>
                <div className="col-9 mt-5">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
            </div>
          
          </Layout>
  )
}

export default Dashboard