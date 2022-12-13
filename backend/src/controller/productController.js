const Product = require("../models/productModel");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { response } = require("../app");

exports.createProduct = async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let product = new Product(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        // console.log('PRODUCT CREATE ERROR ', err);
        return res.status(400).json({
          error: "CANT CREATE PRODUCT",
        });
      }
      res.json(result);
    });
  });
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).populate("category");
    // try {
    //   product.photo = undefined;
    // } catch (err) {
    //   next(err);
    // }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId
    );
    res.status(200).json(deletedProduct);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);
    //product.save()

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }

      if (product.photo) {
        product.photo.data = fs.readFileSync(file.photo.filepath);
        product.photo.contentType = file.photo.mimetype;
      }
    }

    //console.log(product)
    res.status(201).json(product);

    // const updatedHotel = Product.findByIdAndUpdate(
    //   req.params.id,
    //   { $set: req.body },
    //   { new: true }
    // );

    // res.status(200).json(updatedHotel);

    // product.save((err, result) => {
    //   if (err) {
    //     // console.log('PRODUCT CREATE ERROR ', err);
    //     return res.status(400).json({
    //       error: "CANT CREATE PRODUCT",
    //     });
    //   }
    //   res.json(result);
    // });

    //   product
    //  .save()
    //  .then(() => res.status(201).json(product))
    //  .catch(err => res.status(400).json({ error: err }));
  });
};

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.getProducts = async (req, res, next) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;

  try {
    const products = await Product.find()
      .select("-photo")
      //.populate('category')
      .sort([[sortBy, order]])
      .limit(limit);

    res.status(201).json(products);
  } catch (err) {
    next(err);
  }
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */

exports.getRelatedProducts = async (req, res, next) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 4;
  // console.log(req.product)
  try {
    const product = await Product.findById(req.params.productId);
    try {
      const relatedProduct = await Product.find({
        _id: { $ne: product },
        category: product.category,
      })
        .populate("category", "_id name")
        .limit(limit);
      res.status(201).json(relatedProduct);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct("category", {});
    res.status(201).json({
      status: "success",
      categories,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  //.log(order, sortBy, limit, skip, req.body.filters);
  //console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.sendPhoto = async (req, res, next) => {
 
  try {
    const product = await Product.findById(req.params.productId);
   // console.log(product)
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
    next();
  } catch (err) {
    next(err);
  }
};

exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  console.log(query)
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    // assigne category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    }).select("-photo");
  }
};

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: "Could not update product",
      });
    }
    next();
  });
};
