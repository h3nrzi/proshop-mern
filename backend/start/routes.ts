import { Express } from "express";
import products from "../data/products";

module.exports = (app: Express) => {
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
};