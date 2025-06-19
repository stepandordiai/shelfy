import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import "./scss/App.scss";
import { useState } from "react";

function App() {
	const [cart, setCart] = useState([]);

	function addToCart(item) {
		const exists = cart.find((i) => i.id === item.id);

		if (exists) {
			openCart();
		}
		setCart((prev) => [...prev, { ...item, cartQty: 1 }]);
	}

	console.log(cart);

	return (
		<Router>
			<Header cart={cart} />
			<Routes>
				<Route path="/" element={<Home cart={cart} addToCart={addToCart} />} />
			</Routes>
		</Router>
	);
}

export default App;
