import { ProductsList } from "./components/ProductsList";
import { AddNewProduct } from "./components/AddNewProduct";
import { UpdateProduct } from "./components/UpdateProduct";
import { DeleteProduct } from "./components/DeleteProduct";
import { SearchProductbyName } from "./components/SearchProductbyName";
import { Layout } from "./components/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProductsList /> },
      { path: "products/add", element: <AddNewProduct /> },
      { path: "products/update/:id", element: <UpdateProduct /> },
      { path: "products/delete/:id", element: <DeleteProduct /> },
      { path: "products/search", element: <SearchProductbyName /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
