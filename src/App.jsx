import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { useState } from "react";
import Cart from "./components/Cart/Cart";
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
		setTimeout(() => {
			document.querySelector(".cart").classList.add("cart--active");
			document.querySelector(".curtain").classList.add("curtain--active");
		}, 1500);
	}

	function addToWish(item) {
		const exists = wish.find((i) => i.id === item.id);

		if (exists) {
			openCart();
		}
		setWish((prev) => [...prev, item]);
	}

	const hideCart = () => {
		document.querySelector(".cart").classList.remove("cart--active");
		document.querySelector(".curtain").classList.remove("curtain--active");
	};

	return (
		<Router>
			<div onClick={hideCart} className="curtain"></div>
			<Header cart={cart} wish={wish} />
			<Routes>
				<Route path="/" element={<Home productsData={productsData} />} />
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
			<Cart cart={cart} setCart={setCart} />
		</Router>
	);
}

export default App;
