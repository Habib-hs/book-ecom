import React from "react";


const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`http://127.0.0.1:9000/api/v1/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            style={{ maxHeight: "30%", maxWidth: "80%" }}
        />
    </div>
);

export default ShowImage;