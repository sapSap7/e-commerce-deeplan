// render the products list from the database
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import axios from "axios";

// route: /api/products
// Fetch products from the backend's API and display them in a list
export const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/products`,
      );
      console.log(response.data);
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ol>
        {products.map((product) => (
          <li key={product.product_id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProductsList;
