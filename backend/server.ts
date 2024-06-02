require("dotenv").config();
import express from "express";

import products from "./data/products";
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send("API is running...");
});

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    res.send(product);
});


app.listen(port, () => console.log(`Server running on port ${port}`));