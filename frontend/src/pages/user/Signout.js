import React from "react";

function Signout({ name }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      return fetch(`http://127.0.0.1:9000/api/v1/logout/`, {
        method: "GET",
      })
        .then((response) => {
          console.log("remove toh houyar kotha vai");
          localStorage.removeItem("user");
      
          //localStorage.clear()
          // isAuthenticated()
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {name && (
        <button className="btn btn-primary" onClick={handleClick}>
          Logout
        </button>
      )}
    </>
  );
}

export default Signout;
