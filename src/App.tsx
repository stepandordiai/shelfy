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
import type { Product } from "./interfaces/Product";
import classNames from "classnames";
import "./scss/App.scss";

const products = productsData as Product[];

interface CartInterface extends Product {
	productSize: string;
	cartQty: number;
}

function App() {
	const [loadingCart, setLoadingCart] = useState(false);
	const [cart, setCart] = useState<CartInterface[]>([]);
	const [wish, setWish] = useState<Product[]>([]);
	const [isCartVisible, setIsCartVisible] = useState(false);

	async function addToCart(
		item: Product,
		size: string,
		setNotSelectedSizeError: React.Dispatch<React.SetStateAction<boolean>>
	) {
		if (!size) {
			setNotSelectedSizeError(true);
			// TODO: Not a react-friendly way
			const sizes = document.querySelector(
				".product-page__sizes"
			) as HTMLDivElement;
			sizes.scrollIntoView({
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
			setLoadingCart(true);
			await new Promise((resolve) => setTimeout(resolve, 1500));
			setCart((prev) => [...prev, { ...item, cartQty: 1, productSize: size }]);
			setIsCartVisible(true);
			setLoadingCart(false);
		}
	}

	function addToWish(item: Product) {
		const exists = wish.some((i) => i.id === item.id);

		if (exists) {
			setIsCartVisible(true);
		}
		setWish((prev) => [...prev, item]);
	}

	return (
		<Router>
			<ScrollToTop />
			<Cart
				cart={cart}
				setCart={setCart}
				wish={wish}
				addToWish={addToWish}
				isCartVisible={isCartVisible}
				setIsCartVisible={setIsCartVisible}
			/>
			<div
				onClick={() => setIsCartVisible(false)}
				className={classNames("curtain", {
					"curtain--active": isCartVisible,
				})}
			></div>
			<Header
				cart={cart}
				wish={wish}
				isCartVisible={isCartVisible}
				setIsCartVisible={setIsCartVisible}
			/>
			<Routes>
				<Route
					path="/"
					element={
						<Home products={products} addToWish={addToWish} wish={wish} />
					}
				/>
				<Route path="/wish" element={<Wish wish={wish} setWish={setWish} />} />
				<Route path="/login" element={<Login />} />
				<Route
					path="/product-page/:id"
					element={
						<ProductPage
							products={products}
							cart={cart}
							addToCart={addToCart}
							loadingCart={loadingCart}
						/>
					}
				/>
				<Route
					path="/category/:type/:sex"
					element={
						<CategoryPage
							products={products}
							addToWish={addToWish}
							wish={wish}
						/>
					}
				/>
			</Routes>

			<Footer />
		</Router>
	);
}

export default App;
