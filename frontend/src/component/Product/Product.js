/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { read, listRelated } from '../ApiCore'
import Card from '../card/Card';
import { useParams } from "react-router-dom";
import "../../style.css";
import ShowImage from "../imge/ShowImage";
import moment from "moment";
import { addItem } from "../CartHelper.js";

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const addToCart = () => {
        // console.log('added');
        addItem(product, setRedirect(true));
      };

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
              //  fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    let { productId } = useParams(); 
    useEffect(() => {
      // const productId = props.match.params.productId;
     // console.log(productId)
 
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product.description.substring(0, 100)}
            className="container-fluid"
        >
            <div className="row">

            {/* <div className="col-md-8 mt-3">
                    {product && product.description && 
                      <Card product={product} showViewProductButton={false} />} 
          </div> */}

        
        <div className="col-md-8 mt-3">
          <h1 className='text-center  bg-primary'>{product.name}</h1>
         
          <ShowImage className="img-fluid" item={product} url="product" />
          
          <div style={{display: "flex"}}>
          <h2 className="text-muted">Price: ${product.price}</h2>
          <h2 className="text-muted ms-3">
          Discount: {product.discount && product.discount} %
         </h2>
         </div> 

          
         <div style={{display: "flex"}}>
          <h2 className="text-muted">Sold: {product.sold && product.sold}</h2>
          <h2 className="text-muted ms-3">
          quantity: {product.quantity && product.quantity} 
         </h2>
         </div> 

         <div style={{display: "flex"}}>
          <h2 className="text-muted">Category: {product.category && product.category.name}</h2>
          <h2 className="text-muted ms-3">
          Added : {moment(product.createdAt).fromNow()}
        </h2>

        </div> 

        { product.quantity > 0 ? (
       <h2 className="text-primary">In Stock </h2>
    ) : (
      <h2>Out of Stock </h2>
    )}
 
       
          <p>{product.description}</p>
          <button    onClick={addToCart} className="btn btn-primary">Add to Cart</button>
          </div>
                  

             

                <div className="col-4 mt-2">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Product;