/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from "react";
import Layout from "../../component/layout/Layout";
import {getProducts} from '../../component/ApiCore'
import Card from "../../component/card/Card";
 import "../../style.css";
 import Search from "../../component/Search/Search";

function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
      getProducts('sold').then(data => {
          if (data.error) {
              setError(data.error);
          } else {
              setProductsBySell(data);
          }
      });
  };

  const loadProductsByArrival = () => {
      getProducts('createdAt').then(data => {
         // console.log(data);
          if (data.error) {
              setError(data.error);
          } else {
              setProductsByArrival(data);
          }
      });
  };

  useEffect(() => {
      loadProductsByArrival();
      loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="One Place where u will get all together."
      className="container-fluid"
    >
        <Search/>
     <h2 className="mb-4 mt-4 ">New Arrivals</h2>
            <div className="row ">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-2 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4 ">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-2 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
    </Layout>
  );
}

export default Home;
