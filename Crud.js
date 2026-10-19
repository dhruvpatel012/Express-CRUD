const express = require("express");
const fs = require("fs");

// Product data that will be added to the database
let newProduct = {
  title: "Mens payjama",
  price: 500,
  description: "payjama for navratri",
  category: "men's clothing",
  image:
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
  rating: {
    rate: 5,
    count: 400,
  },
};

const app = express(); // invoke express function

// GET API: Display a welcome message
app.get("/", (req, res) => {
  res.end("welcome to curd project");
});

// GET API: Read and display all products from db.json
app.get("/products", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.end("error in api", err);
      console.log(err);
    } else {
      res.end(data); // Send the product data as a response
    }
  });
});

// POST API: Add a new product to the database
app.post("/add", (req, res) => {
  // Read the existing data from db.json
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.end("error happen", err);
    } else {
      const dataObj = JSON.parse(data); // Convert JSON string into a JavaScript object

      // Get the ID of the last product
      let productId = dataObj.product[dataObj.product.length - 1].id;

      // Create a new product with an incremented ID
      const newSingleProductData = { ...newProduct, id: ++productId };

      // Add the new product to the product array
      dataObj.product.push(newSingleProductData);

      // Save the updated data back to db.json
      fs.writeFile("./db.json", JSON.stringify(dataObj), (err) => {
        if (err) {
          res.end("Error while adding data into db");
        } else {
          res.end("data added...");
        }
      });
    }
  });
});

// DELETE API: Delete a product using its ID
app.delete("/deleteproduct/:id", (req, res) => {
  // console.log(req.params)

  const { id } = req.params; // Extract the product ID from the URL

  // Read the existing data from db.json
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading file");
    } else {
      const dataObj = JSON.parse(data);
      // Filter out the product whose ID matches the given ID
      const filterProduct = dataObj.product.filter(
        (elem) => elem.id !== Number(id),
      );

      // Check whether the product exists
      if (filterProduct.length === dataObj.product.length) {
        return res.status(404).send("Product not found");
      }

      // Save the updated product list to db.json
      fs.writeFile(
        "./db.json",
        JSON.stringify({ product: filterProduct }),
        (err) => {
          if (err) {
            res.end("error happen", err);
          } else {
            res.send("Data is deleted");
          }
        },
      );
    }
  });
});

// Start the server on port 1212
app.listen(1212, () => {
  console.log("server is running on 1212 port number");
});
