/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getProducts } from "../../component/ApiCore";
import Card from "../../component/card/Card";
import Layout from "../../component/layout/Layout";
import Search from "../../component/Search/Search";
import "../../style.css";


// const SampleNextArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div className="control-btn " onClick={onClick}>
//       <button className="next ">
//         <i className="fa fa-long-arrow-alt-right"></i>
//       </button>
//     </div>
//   );
// };
// const SamplePrevArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div className="control-btn" onClick={onClick}>
//       <button className="prev">
//         <i className="fa fa-long-arrow-alt-left"></i>
//       </button>
//     </div>
//   );
// };

function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [productsByDiscount, setProductsByDiscount] = useState([]);
  const [productsByFeatured, setProductsByFeatured] = useState([]);
  const [error, setError] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  const loadProductsByDiscounts = () => {
    getProducts("discount").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByDiscount(data);
      }
    });
  };

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
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
    loadProductsByDiscounts();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="One Place where u will get all together."
      className="container-fluid"
    >
      <Search />

      <div className="container">
        {/* <h2 className=" mb-4 mt-4 ">Featured Product</h2>
        <Slider {...settings}>
            {productsByFeatured.map((product, i) => (
              <div key={i} className="col-3 mb-3">
                <Card product={product} />
              </div>
            ))}
        </Slider> */}
        <div className="row">
        <h2 className="mb-4 mt-4 ">Flash Sells</h2>
        <Slider {...settings}>

          {productsByDiscount.map((product, i) => (
            
            <div key={i} >
              <Card product={product} />
            
            </div>
          ))}
           
        </Slider>

        {/* <div className="row">
        <h2 className="mb-4 mt-4 ">New Arrivlas</h2>
        <Slider {...settings}>

          {productsByArrival.map((product, i) => (
            
            <div key={i} >
              <Card product={product} />
            
            </div>
          ))}
           
        </Slider> */}


        {/* <div className="row">
        <h2 className="mb-4 mt-4 ">Best Sellers</h2>
        <Slider {...settings}>

          {productsByDiscount.map((product, i) => (
            
            <div key={i} >
              <Card product={product} />
            
            </div>
          ))}
           
        </Slider> */}


       
        {/* <h2 className=" mb-4 mt-4 ">New Arrivals</h2>
        <Slider {...settings}>
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-3 mb-3">
              <Card product={product} />
            </div>
          ))}
        </Slider>

        <h2 className=" mb-4 ">Best Sellers</h2>
        <Slider {...settings}>
          {productsBySell.map((product, i) => (
            <div key={i} className="col-3 mb-3">
              <Card product={product} />
            </div>
          ))}
        </Slider> */}


        </div>
      </div>
    </Layout>
  );
}

export default Home;
