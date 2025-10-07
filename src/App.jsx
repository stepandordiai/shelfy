import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Wish from "./pages/Wish/Wish";
import ProductPage from "./pages/ProductPage/ProductPage";
import productsData from "./assets/data/products-data.json";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ScrollToTop from "./utils/ScrollToTop";
import "./scss/App.scss";

function App() {
	const [cart, setCart] = useState([]);
	const [wish, setWish] = useState([]);

	function addToCart(item, size, setNotSelectedSizeError) {
		if (!size) {
			setNotSelectedSizeError(true);
			// TODO: Not a react-friendly way
			document.querySelector(".product-page__sizes").scrollIntoView({
				behavior: "smooth",
				// TODO:
				block: "center",
			});
			return;
		}

		const exists = cart.some((i) => i.id === item.id && i.productSize === size);

		if (exists) {
			openCart();
		} else {
			setCart((prev) => [...prev, { ...item, cartQty: 1, productSize: size }]);
			setTimeout(() => {
				openCart();
			}, 1500);
		}
	}

	function addToWish(item) {
		const exists = wish.some((i) => i.id === item.id);

		if (exists) {
			openCart();
		}
		setWish((prev) => [...prev, item]);
	}

	const openCart = () => {
		document.querySelector(".cart").classList.add("cart--active");
		document.querySelector(".curtain").classList.add("curtain--active");
	};

	const hideCart = () => {
		document.querySelector(".cart").classList.remove("cart--active");
		document.querySelector(".curtain").classList.remove("curtain--active");
	};

	return (
		<Router>
			<ScrollToTop />
			<div className="main-curtain"></div>
			<div onClick={hideCart} className="curtain"></div>
			<Header cart={cart} wish={wish} />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							productsData={productsData}
							addToWish={addToWish}
							wish={wish}
						/>
					}
				/>
				<Route path="/wish" element={<Wish wish={wish} setWish={setWish} />} />

				<Route
					path="/product-page/:id"
					element={
						<ProductPage
							productsData={productsData}
							cart={cart}
							addToCart={addToCart}
						/>
					}
				/>
				<Route
					path="/category/:type/:sex"
					element={
						<CategoryPage
							productsData={productsData}
							addToWish={addToWish}
							wish={wish}
						/>
					}
				/>
			</Routes>
			<Cart
				cart={cart}
				setCart={setCart}
				wish={wish}
				addToWish={addToWish}
				hideCart={hideCart}
			/>
		</Router>
	);
}

export default App;
