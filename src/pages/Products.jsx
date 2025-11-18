import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const res = await axios.get("https://fakestoreapi.com/products");
  return res.data;
};

export default function Products() {
  const [sortType, setSortType] = useState("");
  const [search, setSearch] = useState("");
  const [productCount, setProductCount] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: fetchProducts,
    queryKey: ["products"],
    onSuccess:(res=>{
      setProductCount(res.length)
    })
  });

  if (isLoading)
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array.from({ length: productCount }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 p-6 rounded-xl shadow-lg animate-pulse"
            >
              <div className="bg-gray-700 h-48 rounded mb-4"></div>
              <div className="bg-gray-700 h-4 w-3/4 rounded mb-2"></div>
              <div className="bg-gray-700 h-4 w-1/2 rounded mb-4"></div>
              <div className="bg-gray-700 h-10 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );


  if (isError)
    return (
      <div className="text-center text-red-400 text-2xl mt-20">
        Failed to fetch products
      </div>
    );

  let sortedProducts = [...data];

  if (sortType === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortType === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortType === "title-asc") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortType === "title-desc") {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  }
  let filteredProducts = sortedProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-6">Products</h1>
      <div className="flex justify-center gap-2 mb-7">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className=" w-[400px] bg-gray-800 text-white p-2  rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Title: A → Z</option>
          <option value="title-desc">Title: Z → A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
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
