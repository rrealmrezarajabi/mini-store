import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchProduct = async ({ queryKey }) => {
  const id = queryKey[1];
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return res.data;
};

export default function ProductDetail() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
  });

  if (isLoading)
    return (
      <div className="text-center text-blue-400 text-2xl mt-20">
        Loading product...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-400 text-2xl mt-20">
        {error.message}
      </div>
    );

  return (
    <div className="p-10 text-center">
      <img
        src={data.image}
        alt={data.title}
        className="h-60 object-contain mx-auto mb-6"
      />
      <h1 className="text-3xl font-bold text-blue-400 mb-4">{data.title}</h1>

      <p className="text-gray-300 mb-4 max-w-2xl mx-auto">{data.description}</p>

      <p className="text-gray-100 text-lg font-semibold mb-6">
        Price: ${data.price}
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
