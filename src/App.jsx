import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { useCart } from "./context/CartContext";

export default function App() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-blue-700 p-4 flex justify-between items-center text-lg shadow-md">
        <div className="flex gap-6">
          <div className="font-bold text-2xl">Mini Store.</div>
        </div>

        <div className="flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-white"
                : "text-blue-200 hover:text-white"
            }
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-white"
                : "text-blue-200 hover:text-white"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-white"
                : "text-blue-200 hover:text-white"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-white"
                : "text-blue-200 hover:text-white"
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/cart"
            className="relative flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-full shadow hover:bg-gray-200 transition"
          >
            🛒
            <span className="font-bold">Cart</span>
            <span className="bg-red-600 text-white text-sm rounded-full px-2 py-0.5 absolute -top-2 -right-2">
              {cartCount}
            </span>
          </NavLink>
        </div>
      </nav>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      
    </div>
  );
}
