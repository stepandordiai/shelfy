import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { useState } from "react";
import Cart from "./pages/Cart/Cart";
import Wish from "./pages/Wish/Wish";
import ProductPage from "./pages/ProductPage/ProductPage";
import productsData from "./assets/data/products-data.json";
import "./scss/App.scss";

function App() {
	const [cart, setCart] = useState([]);
	const [wish, setWish] = useState([]);

	function addToCart(item) {
		const exists = cart.find((i) => i.id === item.id);

		if (exists) {
			openCart();
		}
		setCart((prev) => [...prev, { ...item, cartQty: 1 }]);
	}

	function addToWish(item) {
		const exists = wish.find((i) => i.id === item.id);

		if (exists) {
			openCart();
		}
		setWish((prev) => [...prev, item]);
	}
	return (
		<Router>
			<Header cart={cart} wish={wish} />
			<Routes>
				<Route path="/" element={<Home productsData={productsData} />} />
				<Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
				<Route path="/wish" element={<Wish wish={wish} />} />
				<Route
					path="/product-page/:id"
					element={
						<ProductPage
							productsData={productsData}
							wish={wish}
							cart={cart}
							addToCart={addToCart}
							addToWish={addToWish}
						/>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
