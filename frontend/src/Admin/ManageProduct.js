
import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./ApiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const user =   JSON.parse(localStorage.getItem("user")) ;
     const token = user.token;

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {products.length} products
                    </h2>
                    <hr />

                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li
                                key={i}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <strong>{p.name}</strong>
                                {/* <Link to={`/admin/product/update/${p._id}`} > update</Link>
                                <Link> delete</Link> className="badge badge-warning badge-pill */}
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span >
                                        Update
                                    </span>
                                </Link>

                                <Link>
                                <span
                                    onClick={() => destroy(p._id)}
                                >
                                    Delete
                                </span>
                                </Link>

                            </li>
                        ))}
                    </ul>


                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;