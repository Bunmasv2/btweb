import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./views/ProductList";
import ProductDetail from "./views/ProductDetail";
import HomePage from "./views/HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}
