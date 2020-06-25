const mongoose = require("mongoose");
const { Schema } = mongoose;

const basketSchema = new Schema({
  food_id: {
    type: mongoose.Types.ObjectId,
    ref: "Food",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;
