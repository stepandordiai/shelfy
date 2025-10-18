import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Wish from "./pages/Wish/Wish";
import ProductPage from "./pages/ProductPage/ProductPage";
import productsData from "./data/products-data.json";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ScrollToTop from "./utils/ScrollToTop";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import "./scss/App.scss";

function App() {
	const [cart, setCart] = useState([]);
	const [wish, setWish] = useState([]);
	const [isCartVisible, setIsCartVisible] = useState(false);

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
			setIsCartVisible(true);
		} else {
			setCart((prev) => [...prev, { ...item, cartQty: 1, productSize: size }]);
			setTimeout(() => {
				setIsCartVisible(true);
			}, 1500);
		}
	}

	function addToWish(item) {
		const exists = wish.some((i) => i.id === item.id);

		if (exists) {
			setIsCartVisible(true);
		}
		setWish((prev) => [...prev, item]);
	}

	return (
		<Router>
			<ScrollToTop />
			<div
				onClick={() => setIsCartVisible(false)}
				className={isCartVisible ? "curtain curtain--active" : "curtain"}
			></div>
			<Header cart={cart} wish={wish} setIsCartVisible={setIsCartVisible} />
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
				<Route path="/login" element={<Login />} />
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
				isCartVisible={isCartVisible}
				setIsCartVisible={setIsCartVisible}
			/>
			<Footer />
		</Router>
	);
}

export default App;
