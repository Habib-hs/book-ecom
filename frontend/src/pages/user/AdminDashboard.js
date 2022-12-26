/* eslint-disable no-unused-vars */
import React from 'react'
import Layout from '../../component/layout/Layout'
import {isAuthenticated} from '../../Auth/index'
import { Link } from 'react-router-dom'

function AdminDashboard() {

const user =   JSON.parse(localStorage.getItem("user")) 
const token = user.token;  

const adminLinks = () => {
    return (
        <div className="card">
            <h4 className="card-header bg-primary text-white">Admin Links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/category/create">
                        Create Category
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/product/create">
                        Create Product
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/admin/orders">
                        View Orders
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/admin/products">
                        Manage Products
                    </Link>
                </li>
            </ul>
        </div>
    );
};

const adminInfo = () => {
    return (
        <div className="card mb-5">
            <h3 className="card-header bg-primary text-white">Admin Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{user.name}</li>
                <li className="list-group-item">{user.email}</li>
                <li className="list-group-item">
                    {user.role === true ? "Admin" : "Registered User"}
                </li>
            </ul>
        </div>
    );
};

return (
    <Layout
        title="Dashboard"
        description={`G'day ${user.name}!`}
        className="container-fluid"
    >
        <div className='container'>
        <div className="row mt-5">
            <div className="col-3 mb-5">{adminLinks()}</div>
            <div className="col-9 ">{adminInfo()}</div>
        </div>
        </div>
    </Layout>
);
};

export default AdminDashboard