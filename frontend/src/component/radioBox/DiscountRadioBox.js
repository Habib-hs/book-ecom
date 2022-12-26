/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const DiscountRadioBox = ({ discounts, handleFilters }) => {
    console.log(discounts)
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return discounts.map((p, i) => (
        <div key={i} className="ml-5">
            <input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-2 ml-4"
            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ));
};

export default DiscountRadioBox;