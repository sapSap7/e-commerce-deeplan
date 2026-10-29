// component to create a new product using the POST /api/products endpoint
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CancelButton } from "./CancelButton";
import axios from "axios";

export const AddNewProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [catalogId, setCatalogId] = useState(0);
  const [description, setDescription] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState(
    new Date().toISOString().split("T")[0],
  ); // default to today's date
  const [type, setType] = useState("");
  const [formResult, setFormResult] = useState(null);
  const [addedProductName, setAddedProductName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormResult(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/products`,
        {
          product_name: productName,
          catalog_id: catalogId,
          description: description,
          manufacturing_date: manufacturingDate,
          prod_type: type,
        },
      );
      console.log(response.data);
      // show a success messageand reset the form
      setFormResult("success");
      setAddedProductName(productName);
      setProductName("");
      setCatalogId(0);
      setDescription("");
      setManufacturingDate(new Date().toISOString().split("T")[0]);
      setType("");
    } catch (error) {
      setFormResult("error");
      console.error("Error adding new product:", error.resonse?.data);
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
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
          required
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
        <button type="submit">Add Product</button>
        {formResult === "success" && (
          <p className="success">{addedProductName} added successfully!</p>
        )}
        {formResult === "error" && (
          <p className="error">Error adding product. Please try again.</p>
        )}
      </form>
      <div className="form-actions">
        <CancelButton />
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
};

export default AddNewProduct;
