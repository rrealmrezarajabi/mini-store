import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import heroImage from "../assets/hero.png"; 

export default function Home() {
  const fetchProducts = async () => {
    const res = await axios.get("https://fakestoreapi.com/products?limit=4");
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["featured"],
    queryFn: fetchProducts,
  });

  return (
    <div className="text-white">
      <section
        className="
          h-[60vh] 
          flex flex-col items-center justify-center 
          text-center
           from-blue-700/40 to-indigo-800/40 
          backdrop-blur-xl 
          rounded-b-3xl 
          shadow-xl 
          p-10 
          bg-cover bg-center
        "
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-l text-blue-950">
          Welcome to Mini Store
        </h1>

        <p className=" text-lg max-w-xl mb-8 text-blue-950">
          Discover the best products at the best prices. Fast, simple, and
          modern shopping experience.
        </p>

        <Link
          to="/products"
          className="bg-blue-900 hover:bg-blue-950 px-8 py-3 rounded-lg text-white text-xl font-semibold shadow-md transition"
        >
          Shop Now
        </Link>
      </section>

      <section className="p-10">
        <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
          Featured Products
        </h2>

        {isLoading ? (
          <p className="text-center text-blue-300">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((product) => (
              <div
                key={product.id}
                className="
                  bg-gray-800 
                  p-4 
                  rounded-xl 
                  shadow-lg 
                  flex flex-col items-center 
                  hover:scale-105 
                  transition 
                  h-[360px] 
                  justify-between
                "
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 object-contain"
                />

                <h3 className="font-semibold text-center line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-green-400 font-bold">${product.price}</p>

                <Link
                  to={`/products/${product.id}`}
                  className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
