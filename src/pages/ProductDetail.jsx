import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Failed to fetch product ");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-blue-400 text-2xl mt-20">
        Loading product...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-400 text-2xl mt-20">{error}</div>
    );

  if (!product)
    return (
      <div className="text-center text-gray-400 text-2xl mt-20">
        Product not found
      </div>
    );

  return (
    <div className="p-10 text-center">
      <img
        src={product.image}
        alt={product.title}
        className="h-60 object-contain mx-auto mb-6"
      />
      <h1 className="text-3xl font-bold text-blue-400 mb-4">{product.title}</h1>
      <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
        {product.description}
      </p>
      <p className="text-gray-100 text-lg font-semibold mb-6">
        Price: ${product.price}
      </p>
      <Link
        to="/products"
        className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors"
      >
        ← Back to Products
      </Link>
    </div>
  );
}
