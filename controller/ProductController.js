const axios = require("axios");
const client = require("../config/Redis");

exports.GetProduct = async (req, res) => {
  try {
    client.get("products", async (err, product) => {
      if (err) return res.status(500).send(err.message);
      if (product) {
        return res.json({
          message: "Cached with redis",
          data: JSON.parse(product),
        });
      } else {
        const response = await axios.get("https://dummyjson.com/products");
        const data = response.data;
        client.setex("products", 3600, JSON.stringify(data));
        return res.json({ message: "Not Cached", data });
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.GetProductById = async (req, res) => {
  const { id } = req.params;
  try {
    client.get(`product/${id}`, async (err, product) => {
      if (err) return res.status(500).send(err.message);
      if (product) {
        return res.json({
          message: "Cached with redis",
          data: JSON.parse(product),
        });
      } else {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        const data = response.data;
        client.setex(`product/${id}`, 3600, JSON.stringify(data));
        return res.json({ message: "Not Cached", data });
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
