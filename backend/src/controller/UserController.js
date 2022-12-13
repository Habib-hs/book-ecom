const User = require("../models/userModel");
const { Order } = require("../models/orderModel");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = (req, res) => {
  req.body.role = 0; // role will always be 0
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

exports.addOrderToUserHistory = async (req, res, next) => {
  let history = [];

  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  const user = await User.findById(req.params.userId);
  // console.log(user)

  User.findOneAndUpdate(
    { _id: user._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        // return res.status(400).json({
        //     error: 'Could not update user purchase history'
        // });
        console.log(error);
      }
      // console.log('response is not coming')
      next();
    }
  );
  //next();
};

exports.purchaseHistory = (req, res) => {
   // console.log(Order.find(req.params.userId));

  const user = User.findById(req.params.userId);
  Order.find({ user: user._id })
    .populate("user", 'name')
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
     // console.log(orders)
      res.json(orders);
    });
};
