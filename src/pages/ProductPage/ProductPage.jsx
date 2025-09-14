import { useParams } from "react-router-dom";
import { useState } from "react";
import "./ProductPage.scss";

const ProductPage = ({ productsData, wish, cart, addToCart, addToWish }) => {
	const { id } = useParams();
	const [chosenSize, setChozenSize] = useState("");

	const product = productsData.find((productData) => productData.id == id);

	const isInCart = cart.some(
		(cartItem) =>
			cartItem.id === product.id && cartItem.productSize === chosenSize
	);

	const handleChosenSize = (props) => {
		setChozenSize((prev) => (prev = props));
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
					<p>Select a size</p>
					<div className="product-page__sizes">
						{product.sizesQty.map(({ size, qty }) => {
							return (
								<div className="product-page__size" key={size}>
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
					<div className="btn-container">
						<button
							className="product-page__add-to-cart-btn"
							onClick={() => addToCart(product, chosenSize)}
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
