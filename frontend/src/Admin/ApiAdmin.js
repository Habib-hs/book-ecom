exports.createCategory = async (userId, token, category) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:9000/api/v1/category/create/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// export const updateCategory = (categoryId, userId, token, category) => {
//     return fetch(`${API}/category/${categoryId}/${userId}`, {
//         method: 'PUT',
//         headers: {
//             // content type?
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(category)
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };

exports.createProduct = async (userId, token, product) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:9000/api/v1/product/create/${userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: product,
      }
    );
    console.log(response);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// exports.getCategory = categoryId => {
//     return fetch(`${API}/category/${categoryId}`, {
//         method: 'GET'
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };

exports.getCategories = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:9000/api/v1/Categories`, {
      method: "GET",
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

exports.listOrders = async (userId, token) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:9000/api/v1/order/list/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

exports.getStatusValues = async (userId, token) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:9000/api/v1/order/status-values/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

exports.updateOrderStatus = async (userId, token, orderId, status) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:9000/api/v1/order/${orderId}/status/${userId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, orderId }),
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

exports.getProducts = async () => {
  try {
    const response = await fetch(
      `http://127.0.0.1:9000/api/v1/products?limit=undefined`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

exports.deleteProduct = async (productId, userId, token) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:9000/api/v1/product/${productId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

exports.getProduct = async (productId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:9000/api/v1/product/${productId}`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

exports.updateProduct = async (productId, userId, token, product) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:9000/api/v1/product/${productId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: product,
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
