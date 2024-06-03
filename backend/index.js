const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors'); 
const port = 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to set Cache-Control headers for JSON responses
app.use((req, res, next) => {
  if (req.accepts('json')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
  next();
});

// GET endpoint to fetch cart data
app.get('/carts', (req, res) => {
  fs.readFile('carts.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// PUT endpoint to update cart data
app.put('/carts/:id', (req, res) => {
  const cartId = parseInt(req.params.id, 10);
  const updatedProducts = req.body.products;

  fs.readFile('carts.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }

    let cartsData = JSON.parse(data);
    const cartIndex = cartsData.carts.findIndex(cart => cart.id === cartId);

    if (cartIndex === -1) {
      res.status(404).send('Cart not found');
      return;
    }

    cartsData.carts[cartIndex].products = updatedProducts;

    fs.writeFile('carts.json', JSON.stringify(cartsData, null, 2), 'utf8', (err) => {
      if (err) {
        res.status(500).send('Error writing file');
        return;
      }

      res.json(cartsData);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
