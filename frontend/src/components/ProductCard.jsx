// component to display a single product card
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const {
    product_id,
    product_name,
    catalog_id,
    product_desc,
    manu_date,
    prod_type,
  } = product;
  return (
    <div className="product-card">
      <div className="card-actions">
        <Link to={`/products/update/${product_id}`} aria-label="Edit product">
          <Pencil size={18} />
        </Link>
        <Link to={`/products/delete/${product_id}`} aria-label="Delete Product">
          <Trash size={18} />
        </Link>
      </div>
      <h3>{product_name}</h3>
      <p>Catalog ID: {catalog_id}</p>
      <p>Description: {product_desc}</p>
      <p>Manufacturing Date: {new Date(manu_date).toLocaleDateString()}</p>
      <p>Type: {prod_type}</p>
    </div>
  );
};
