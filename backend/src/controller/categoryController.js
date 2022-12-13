const Category = require("../models/categoryModel");
const { createError } = require("../utlis/error.js");

// exports.categoryById = (req, res, next, id) => {
//     Category.findById(id).exec((err, category) => {
//         if (err || !category) {
//             return res.status(400).json({
//                 error: 'Category does not exist'
//             });
//         }
//         req.category = category;
//         next();
//     });
// };

exports.createCategory = async(req, res, next) => {
    const category = new Category(req.body);
  try {
      const savedCategory = await category.save()

    res.status(400).json({
        status: "success",
        data: {
        savedCategory
        }
    })
  } catch (err) {
    next(err);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    console.log('Iam on now man')
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  console.log(
    'Iam available'
  )
  try {
    const deletedCategory = await Category.findByIdAndDelete(
      req.params.categoryId
    );
    res.status(200).json(deletedCategory);
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);z
  }
};




// exports.read = (req, res) => {
//     return res.json(req.category);
// };

// exports.update = (req, res) => {
//     console.log('req.body', req.body);
//     console.log('category update param', req.params.categoryId);

//     const category = req.category;
//     category.name = req.body.name;
//     category.save((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         res.json(data);
//     });
// };

// exports.remove = (req, res) => {
//     const category = req.category;
//     Product.find({ category }).exec((err, data) => {
//         if (data.length >= 1) {
//             return res.status(400).json({
//                 message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated products.`
//             });
//         } else {
//             category.remove((err, data) => {
//                 if (err) {
//                     return res.status(400).json({
//                         error: errorHandler(err)
//                     });
//                 }
//                 res.json({
//                     message: 'Category deleted'
//                 });
//             });
//         }
//     });
// };

// exports.list = (req, res) => {
//     Category.find().exec((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         res.json(data);
//     });
// };
