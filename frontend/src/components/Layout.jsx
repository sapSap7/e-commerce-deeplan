import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <header>
        <h1>Welcome to Sapir's Store!</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/products/add">Add Product</Link>{" "}
          |{" "}
          <Link to="/products/search">
            <input type="text" placeholder="Search for a product..." />
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2024 Sapir's Store. All rights reserved.</p>
      </footer>
    </div>
  );
};
