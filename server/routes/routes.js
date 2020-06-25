const Basket = require("../models/basket");
const Food = require("../models/food");

module.exports = (app) => {
  app.post("/addToBasket/:foodId", async (req, res) => {
    const { foodId } = req.params;
    const basketItem = await Basket.findOne({ food_id: foodId });

    try {
      if (!basketItem) {
        const basket = new Basket({ food_id: foodId });
        const savedBasket = await basket.save();
        res.json(savedBasket);
      } else {
        basketItem.quantity = basketItem.quantity + 1;
        const savedBasket = await basketItem.save();
        res.json(savedBasket);
      }
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get("/basket/", async (req, res) => {
    Basket.find({})
      .populate("food_id")
      .exec(function (err, result) {
        if (err) return console.log(err);
        res.json(result);
      });
  });

  app.get("/foods/:food", async (req, res) => {
    try {
      const { food } = req.params;
      const filteredFoods = await Food.find({ name: food });
      res.json(filteredFoods);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.get("/foods", async (req, res) => {
    try {
      const result = await Food.find({});
      res.json(result);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete("/cleancart", async (req, res) => {
    try {
      const deleted = await Basket.deleteMany({});
      res.json(deleted);
    } catch (err) {
      console.log(err);
    }
  });

  app.delete("/reduceQuantity/:foodId", async (req, res) => {
    const { foodId } = req.params;
    const basketItem = await Basket.findOne({ food_id: foodId });
    try {
      basketItem.quantity = basketItem.quantity - 1;
      const basket = await basketItem.save();
      res.json(basket);
    } catch (err) {
      console.log(err);
    }
  });

  app.delete("/removefrombasket/:foodId", async (req, res) => {
    const { foodId } = req.params;
    try {
      const removed = await Basket.findOneAndDelete({ food_id: foodId });
      res.json(removed);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/addfood", async (req, res) => {
    const { food } = req.body;
    console.log(food);

    try {
      const newFood = new Food(food);
      const result = await newFood.save();
      res.json(result);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/filterdata", async (req, res) => {
    const { selections } = req.body;
    const { renderedFood } = req.body;
    const { foodTypes } = req.body;

    Food.find(
      {
        $and: [
          {
            name: renderedFood ? renderedFood : { $exists: true },
          },
          {
            $or: [
              {
                type:
                  selections.selectedType === "All"
                    ? { $exists: true }
                    : selections.selectedType,
              },
            ],
          },
          {
            $or: [
              { size: selections.sizes.big === true ? "Big" : null },
              { size: selections.sizes.medium === true ? "Medium" : null },
              { size: selections.sizes.small === true ? "Small" : null },
            ],
          },
          {
            $and: [
              { price: { $gte: selections.priceRange.min } },
              { price: { $lte: selections.priceRange.max } },
            ],
          },
        ],
      },
      function (err, results) {
        if (err) return err;
        res.json(results);
      }
    );
  });
};
