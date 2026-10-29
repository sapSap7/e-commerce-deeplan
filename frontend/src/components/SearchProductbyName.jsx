// render a product by its' name
import { useState } from "react";
import { ProductCard } from "./ProductCard";
import axios from "axios";

export const SearchProductbyName = () => {
  const [results, setResults] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSearch = async (e) => {
    e.preventDefault();
    const name = searchName.trim();
    if (!name) return;

    setStatus("loading");
    setResults([]);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/products/product_name/${encodeURIComponent(name)}`,
      );
      setResults(response.data);
      setStatus("found");
    } catch (error) {
      if (error.response?.status === 404) {
        setStatus("not-found");
      } else {
        console.error("Error fetching product:", error.response?.data);
        setStatus("error");
      }
    }
  };

  return (
    <div>
      <h2>Search Product by Name</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button
          type="submit"
          disabled={status === "loading" || !searchName.trim()}
        >
          {status === "loading" ? "Searching..." : "Search"}
        </button>
      </form>

      {status === "not-found" && (
        <p className="error">No products found for "{searchName}".</p>
      )}
      {status === "error" && (
        <p className="error">Something went wrong. Please try again.</p>
      )}

      {status === "found" && (
        <ol>
          {results.map((product) => (
            <li key={product.product_id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

// export function AutocompleteSearch() {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(-1);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     if (query.trim() === '') {
//       setSuggestions([]);
//       return;
//     }

//     const delayDebounce = setTimeout(async () => {
//       try {
//         const results = await axios.get(`/api/suggestions?query=${query}`);
//         setSuggestions(results.data);
//         setIsOpen(results.data.length > 0);
//       } catch (error) {
//         console.error("Failed fetching suggestions:", error);
//       }
//     }, 300);

//     return () => clearTimeout(delayDebounce);
//   }, [query]);
// }
