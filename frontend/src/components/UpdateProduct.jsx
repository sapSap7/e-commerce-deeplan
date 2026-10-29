// update existing product from list and send the updated data to the backend
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CancelButton } from "./CancelButton";

export const UpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [catalogId, setCatalogId] = useState(0);
  const [description, setDescription] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [type, setType] = useState("");
  const [formResult, setFormResult] = useState(null);
  const [updatedProductName, setUpdatedProductName] = useState("");
  const navigate = useNavigate();
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${productId}`,
        );
        const product = response.data;
        setProductName(product.product_name ?? "");
        setCatalogId(product.catalog_id ?? 0);
        setDescription(product.product_desc ?? "");
        setManufacturingDate(
          product.manu_date
            ? new Date(product.maun_date).toLocaleDateString("en-CA")
            : "",
        );
        setType(product.prod_type ?? "");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/${productId}`,
        {
          product_name: productName,
          catalog_id: catalogId,
          description: description,
          manufacturing_date: manufacturingDate,
          prod_type: type,
        },
      );
      console.log(response.data);
      setUpdatedProductName(productName);
      setFormResult("success");
    } catch (error) {
      setFormResult("error");
      console.error("Error updating product:", error.response?.data);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          required
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Catalog ID"
          value={catalogId}
          onChange={(e) => setCatalogId(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={manufacturingDate}
          onChange={(e) => setManufacturingDate(e.target.value)}
        />
        <select value={type} required onChange={(e) => setType(e.target.value)}>
          <option value={""}>Select a type</option>
          <option value={"vegetable"}>vegetable</option>
          <option value={"fruit"}>fruit</option>
          <option value={"grain"}>grain</option>
        </select>
        <button type="submit">Update Product</button>
        <CancelButton />
        {formResult === "success" && (
          <p className="success">{updatedProductName} updated successfully!</p>
        )}
        {formResult === "error" && (
          <p className="error">
            Error updating product details. Please try again.
          </p>
        )}
      </form>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
};

export default UpdateProduct;
