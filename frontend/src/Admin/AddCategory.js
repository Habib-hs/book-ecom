import React, { useState } from "react";
import Layout from "../component/layout/Layout";
import { Link } from "react-router-dom";
import { createCategory } from "./ApiAdmin";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
   // const { user, token } = isAuthenticated();
    const user =   JSON.parse(localStorage.getItem("user")) ;
   
    

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        createCategory(user._id, user.token, { name }).then(data => {
            console.log(data)
            if (data.success === false) {
                setError(true);
              
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group mt-4">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                     autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary mt-2">Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            setSuccess(false)
            return <h3 className="text-success">Category {name} is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Layout
            title="Add a new category"
            description={`G'day ${user.name}, ready to add a new category?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryFom()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;