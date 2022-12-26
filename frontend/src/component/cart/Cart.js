/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import { getCart } from "../CartHelper.js";
import Checkout from "../checkOut/CheckOut";
import Layout from "../layout/Layout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    //   itemTotal();
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <div className="container">
        <div className="row">
          <div className="col-6">
            {items.length > 0 ? showItems(items) : noItemsMessage()}
          </div>

          <div className="col-6">
            {!user ? (
              <>
                {" "}
                <div style={{ width: "100%", height: "400px" }}>
                  <h4 className="my-5 text-center text-primary">
                    Please Sign in to Pursase the items.{" "}
                    <Link to="/signin">Signin Here</Link>
                  </h4>
                </div>
              </>
            ) : (
              <>
                <h2 className="mb-4 ">Your cart summary</h2>
                <hr />
                <Checkout products={items} setRun={setRun} run={run} />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Cart;
