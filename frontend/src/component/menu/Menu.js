
/* eslint-disable no-restricted-globals */
import React , {useState,useEffect} from "react";
import { Link  } from "react-router-dom";
import {isAuthenticated, selectDashboard} from '../../Auth/index'
import { itemTotal } from "../CartHelper";
import '../../style.css'

function Menu() {

  

    const signout = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
        return fetch(`http://127.0.0.1:9000/api/v1/logout/`, {
            method: 'GET'
        })
            .then(response => {
               console.log("remove toh houyar kotha vai")
                localStorage.removeItem('user');
                window.location.reload();
               localStorage.clear()
              isAuthenticated()

            })
            .catch(err => console.log(err));
    }
};

  return (
    <>
             <div>
        <ul className="nav nav-tabs bg-secondary ">
           <li className="nav-item">
              <Link
                    className="nav-link text-light"
                    to="/"
                >
                    Home
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link text-light"
                    to="/shop"
                >
                    Shop
                </Link>
            </li>


         
            <li className="nav-item">
                <Link
                    className="nav-link text-light"
                    to="/cart"
                >
                    Cart
                    <sup>
                        <small className="cart-badge"> {
                        
                        itemTotal()}</small>
                    </sup>
                </Link>
            </li>
          

            {isAuthenticated() && (!selectDashboard())  &&(
                <li className="nav-item">
                    <Link
                        className="nav-link text-light"
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            {isAuthenticated() && (selectDashboard()) && (
                <li className="nav-item">
                    <Link
                        className="nav-link text-light"
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}


         {!isAuthenticated() &&  
   <>
            <li className="nav-item">
                <Link
                    className="nav-link text-light"
                    to="/signup"
                >
                  Signup
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link text-light"
                    to="/signin"
                >
                  Signin
                </Link>
            </li>
            </>
        }
            


            
            {isAuthenticated() &&  
                            <li className="nav-item">
                            <Link
                                        className="nav-link"
                                       style={{ cursor: "pointer", color: "#ffffff" }}
                                        onClick={signout}
                                        to='/'
                                    >
                                        Signout
                                </Link>
                           </li>
                           }
                   

         </ul>
     </div>
    </>
  )
}

export default Menu

// /* eslint-disable no-restricted-globals */
// import React , {useState,useEffect} from "react";
// import { Link  } from "react-router-dom";
// import {isAuthenticated, selectDashboard} from '../../Auth/index'
// import { itemTotal } from "../CartHelper";
// import '../../style.css'


// const signout = (e) => {
//     e.preventDefault();
//     if (typeof window !== 'undefined') {
//         return fetch(`http://127.0.0.1:9000/api/v1/logout/`, {
//             method: 'GET'
//         })
//             .then(response => {
//                console.log("remove toh houyar kotha vai")
//                 localStorage.removeItem('user');
//                 window.location.reload();
//                localStorage.clear()
//               isAuthenticated()

//             })
//             .catch(err => console.log(err));
//     }
// };




// const Menu = () => (

     

//      <div>
//          <ul className="nav nav-tabs bg-secondary ">
//             <li className="nav-item">
//                 <Link
//                     className="nav-link text-light"
//                     to="/"
//                 >
//                     Home
//                 </Link>
//             </li>

//             <li className="nav-item">
//                 <Link
//                     className="nav-link text-light"
//                     to="/shop"
//                 >
//                     Shop
//                 </Link>
//             </li>


         
//             <li className="nav-item">
//                 <Link
//                     className="nav-link text-light"
//                     to="/cart"
//                 >
//                     Cart
//                     <sup>
//                         <small className="cart-badge"> {
                        
//                         itemTotal()}</small>
//                     </sup>
//                 </Link>
//             </li>
          

//             {isAuthenticated() && (!selectDashboard())  &&(
//                 <li className="nav-item">
//                     <Link
//                         className="nav-link text-light"
//                         to="/user/dashboard"
//                     >
//                         Dashboard
//                     </Link>
//                 </li>
//             )}

//             {isAuthenticated() && (selectDashboard()) && (
//                 <li className="nav-item">
//                     <Link
//                         className="nav-link text-light"
//                         to="/admin/dashboard"
//                     >
//                         Dashboard
//                     </Link>
//                 </li>
//             )}


//          {!isAuthenticated() &&  
//    <>
//             <li className="nav-item">
//                 <Link
//                     className="nav-link text-light"
//                     to="/signup"
//                 >
//                   Signup
//                 </Link>
//             </li>

//             <li className="nav-item">
//                 <Link
//                     className="nav-link text-light"
//                     to="/signin"
//                 >
//                   Signin
//                 </Link>
//             </li>
//             </>
//         }
            


            
//             {isAuthenticated() &&  
//                             <li className="nav-item">
//                             <Link
//                                         className="nav-link"
//                                        style={{ cursor: "pointer", color: "#ffffff" }}
//                                         onClick={signout}
//                                         to='/'
//                                     >
//                                         Signout
//                                 </Link>
//                            </li>
//                            }
                   

//          </ul>
//      </div>
// )

// export default Menu;

