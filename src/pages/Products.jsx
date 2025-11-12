import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to fetch products ");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-center text-blue-400 text-2xl mt-20">
        Loading products...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-400 text-2xl mt-20">{error}</div>
    );

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-between hover:scale-105 transition-transform"
          >
            <img
              src={p.image}
              alt={p.title}
              className="h-48 object-contain mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold text-white mb-2 truncate">
              {p.title}
            </h2>
            <p className="text-gray-400 mb-3">${p.price}</p>
            <Link
              to={`/products/${p.id}`}
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
