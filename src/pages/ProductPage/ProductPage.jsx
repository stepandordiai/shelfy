import { useParams } from "react-router-dom";
import { useState } from "react";
import "./ProductPage.scss";

const ProductPage = ({ productsData, wish, cart, addToCart, addToWish }) => {
	const { id } = useParams();
	const [chosenSize, setChozenSize] = useState("");

	const [notSelectedSizeError, setNotSelectedSizeError] = useState(false);

	const product = productsData.find((productData) => productData.id == id);

	const isInCart = cart.some(
		(cartItem) =>
			cartItem.id === product.id && cartItem.productSize === chosenSize
	);

	const handleChosenSize = (props) => {
		setChozenSize((prev) => (prev = props));
		setNotSelectedSizeError(false);
	};
	return (
		<>
			<main className="product-page">
				<div className="product-page__img-container">
					<img src={product.img} alt="" />
				</div>
				<div className="product-page__details">
					<h1 className="product-page__details-title">{product.name}</h1>
					<p>€{product.priceCents / 100}</p>
					<div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<p>Select a size</p>
							<p>Size Guide</p>
						</div>
						<div
							style={
								notSelectedSizeError
									? { border: "1px solid var(--accent-red)" }
									: null
							}
							className="product-page__sizes"
						>
							{product.sizesQty.map(({ size, qty }) => {
								return (
									<div
										style={qty === 0 ? { pointerEvents: "none" } : null}
										className="product-page__size"
										key={size}
									>
										<label
											style={qty === 0 ? { color: "rgba(0,0,0,0.5)" } : {}}
											htmlFor={size}
										>
											{size}
										</label>
										<input
											onChange={() => handleChosenSize(size)}
											type="radio"
											name="productSize"
											id={size}
											disabled={qty === 0}
											checked={chosenSize === size}
										/>
									</div>
								);
							})}
						</div>
						{notSelectedSizeError && (
							<strong style={{ color: "var(--accent-red)" }}>
								Please select a size
							</strong>
						)}
					</div>
					<div className="btn-container">
						<button
							className="product-page__add-to-cart-btn"
							onClick={() =>
								addToCart(product, chosenSize, setNotSelectedSizeError)
							}
						>
							{isInCart ? "In cart" : "Add to Cart"}
						</button>
					</div>
				</div>
			</main>
		</>
	);
};

export default ProductPage;
