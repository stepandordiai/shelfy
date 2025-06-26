import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import "./scss/App.scss";
import { useState } from "react";
import Cart from "./pages/Cart/Cart";
import Wish from "./pages/Wish/Wish";

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
				<Route
					path="/"
					element={
						<Home
							wish={wish}
							cart={cart}
							addToCart={addToCart}
							addToWish={addToWish}
						/>
					}
				/>
				<Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
				<Route path="/wish" element={<Wish wish={wish} />} />
			</Routes>
		</Router>
	);
}

export default App;
