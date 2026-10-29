// delete existing product from list and send the deletion request to the backend
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { CancelButton } from "./CancelButton";

export const DeleteProduct = () => {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);
  const [product, setProduct] = useState(null);
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${productId}`,
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error.response?.data);
      }
    };
    fetchProduct();
  }, [productId]);
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${productId}`,
      );
      setIsDeleted(true);
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      {product ? <ProductCard product={product} /> : <p>Loading..</p>}
      <div className="form-actions">
        <button
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this product?")
            ) {
              handleDelete();
            }
          }}
        >
          Delete Product
        </button>
        <CancelButton />
      </div>
      {isDeleted && <p>Product deleted successfully</p>}
    </div>
  );
};

export default DeleteProduct;
