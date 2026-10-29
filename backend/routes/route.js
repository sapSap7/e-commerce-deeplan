import pool from "../db.js";
import express from "express";
export const router = express.Router();

// POST /api/products - Create a new product and add to the database
export function createProduct(router) {
  return router.post("/api/products", async (req, res) => {
    const {
      product_name,
      catalog_id,
      description,
      manufacturing_date,
      prod_type,
    } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO products (product_name, catalog_id, product_desc , manu_date, prod_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [product_name, catalog_id, description, manufacturing_date, prod_type],
      );
      res.status(201).json(result.rows);
    } catch (err) {
      console.error("Error creating product:", err.message);
      res.status(500).json({ error: "Failed to create product" });
    }
  });
}

// PUT /api/products/:id - Update an existing product in the database
export function updateProduct(router) {
  return router.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const {
      product_name,
      catalog_id,
      description,
      manufacturing_date,
      prod_type,
    } = req.body;
    try {
      const result = await pool.query(
        "UPDATE products SET product_name = $1, catalog_id = $2, product_desc = $3, manu_date = $4, prod_type = $5 WHERE product_id = $6 RETURNING *",
        [
          product_name,
          catalog_id,
          description,
          manufacturing_date,
          prod_type,
          id,
        ],
      );
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error updating product:", err.message);
      res.status(500).json({ error: "Failed to update product" });
    }
  });
}

// DELETE /api/products/:id - Delete a product from the database
export function deleteProduct(router) {
  return router.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM products WHERE product_id = $1", [id]);
      res.status(204).send();
    } catch (err) {
      console.error("Error deleting product:", err.message);
      res.status(500).json({ error: "Failed to delete product" });
    }
  });
}

// GET /api/products - Get all products from the database
export function getProducts(router) {
  // console.log("getProducts function called");
  return router.get("/api/products", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM products");
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching products:", err.message);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
}

// GET /api/products/:id - Get a single product by ID from the database
export function getProductById(router) {
  return router.get("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        "SELECT * FROM products WHERE product_id = $1",
        [id],
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (err) {
      console.error("Error fetching product:", err.message);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
}

//GET /api/products/:product_name  retrieve a product by its name from the database
export function getProductByName(router) {
  return router.get(
    "/api/products/product_name/:product_name",
    async (req, res) => {
      const { product_name } = req.params;
      try {
        const result = await pool.query(
          "SELECT * FROM products WHERE product_name ILIKE $1 || '%'",
          [product_name],
        );
        if (result.rows.length === 0) {
          res.status(404).json({ error: "Product not found" });
        } else {
          res.status(200).json(result.rows);
        }
      } catch (err) {
        console.error("Error fetching product:", err.message);
        res.status(500).json({ error: "Failed to fetch product" });
      }
    },
  );
}

// Export the router with all routes
export default router;
