/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { addItem, removeItem, updateItem } from "../CartHelper.js";
import ShowImage from "../imge/ShowImage";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-1">
          <button className="btn btn-outline-primary mr-2 card-btn-1">
            view 
          </button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning card-btn-1 mx-3"
        >
          Add to cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
   return  quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  return (
    
    <div className="card">
      <div className="card-header bg-primary  text-center">{product.name}</div>
      <div className="card-body bg-light">
        {shouldRedirect(redirect)}
        <ShowImage className="img-fluid item-center text-center" item={product} url="product" />
        {/* <p className="card-p fw-bolder mt-2">{product.description.substring(0, 100)} </p> */}
        
         <div style={{display: "flex"}}>
        <p className="card-p black-10">price : $ {product.price}</p>
        <p className="card-p black-10 mx-3 text-success"> in stock: {product.quantity}</p>
        </div>
        <div style={{display: "flex"}}>
        <p className="black-9 card-p">
          Sold: {product.sold && product.sold}
        </p>
        {/* <p className="card-p black-9">
          Category: {product.category && product.category.name}
        </p> */}

        <p className="card-p black-9 ms-2">
          Discount: {product.discount && product.discount} %
        </p>
        </div> 

        {/* <div style={{display: "flex"}}>
        <p className="black-9">
          Sold: {product.sold && product.sold}
        </p>
        <p className="black-8 mx-3 ">
          Added{moment(product.createdAt).fromNow()}
        </p>

        </div> */}
      
        {/* {showStock(product.quantity)} */}
       
        {/* <p className="card-p black-16">

        { product.quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    )}

        </p> */}


       

        {showViewButton(showViewProductButton)}

        {showAddToCartBtn(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
   
  );
};

// const Card = ({
//   product,
//   showViewProductButton = true,
//   showAddToCartButton = true,
//   cartUpdate = false,
//   showRemoveProductButton = false,
//     setRun = f => f,
//     run = undefined

//   // changeCartSize
// }) => {
//   const [redirect, setRedirect] = useState(false);
//   const [count, setCount] = useState(product.count);

//   const showViewButton = showViewProductButton => {
//     return (
//       showViewProductButton && (
//         <Link to={`/product/${product._id}`} className="mr-2">
//           <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
//         </Link>
//       )
//     );
//   };

//   const addToCart = () => {
//     console.log('added');
//    // setRun(!run)
//     addItem(product, setRedirect(true));

//   };

//   const shouldRedirect = redirect => {
//     if (redirect) {
//       return <Navigate to="/cart" />;
//     }
//   };

//   const showAddToCartBtn = showAddToCartButton => {
//     return (
//       showAddToCartButton && (
//         <button     onClick={() => {
//           addItem(product);
//           setRun(!run);  } }

//            className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
//           Add to cart
//         </button>
//       )
//     );
//   };

//   const showStock = quantity => {
//     return quantity > 0 ? (

//       <span className="badge badge-primary badge-pill">
//         In Stock
//         </span>
//     ) : (
//       <span className="badge badge-primary badge-pill">
//         Out of Stock
//         </span>
//     );
//   };

//   const handleChange = productId => event => {
//     setRun(!run); // run useEffect in parent Cart
//     setCount(event.target.value < 1 ? 1 : event.target.value);
//     if (event.target.value >= 1) {
//       updateItem(productId, event.target.value);
//     }
//   };

//   const ShowCartUpdateOptions = cartUpdate => {
//     return (
//       cartUpdate && (
//         <div>
//           <div className="input-group mb-3">
//             <div className="input-group-prepend">
//               <span className="input-group-text">Adjust Quantity</span>
//             </div>
//             <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
//           </div>
//         </div>
//       )
//     );
//   };

//   const showRemoveButton = showRemoveProductButton => {
//     return (
//       showRemoveProductButton && (
//         <button
//           onClick={() => {
//             removeItem(product._id);
//             setRun(!run); // run useEffect in parent Cart
//           }}
//           className="btn btn-outline-danger mt-2 mb-2"
//         >
//           Remove Product
//         </button>
//       )
//     );
//   };

//   return (
//     <div className="card ">
//       <div className="card-header card-header-1 ">{product.name}</div>
//       <div className="card-body">
//          {/* {shouldRedirect(redirect)} */}
//         <ShowImage item={product} url="product" />
//         <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
//         <p className="card-p black-10">$ {product.price}</p>
//         <p className="black-9">Category: {product.category && product.category.name}</p>
//         <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
//         {showStock(product.quantity)}
//         <br />

//         {showViewButton(showViewProductButton)}

//          {showAddToCartBtn(showAddToCartButton)}

//       {showRemoveButton(showRemoveProductButton)}

//      { ShowCartUpdateOptions(cartUpdate)}

//       </div>
//     </div>
//   );
// };

export default Card;
