const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String },
  type: { type: String },
  image: { type: String },
});

const Food = mongoose.model("Food", schema);
module.exports = Food;
