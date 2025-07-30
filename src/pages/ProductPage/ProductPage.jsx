import { useParams } from "react-router-dom";
import "./ProductPage.scss";

const ProductPage = ({ productsData, wish, cart, addToCart, addToWish }) => {
	const { id } = useParams();

	// const isInWish = wish.some((item) => item.id === el.id);
	const product = productsData.find((productData) => productData.id == id);

	const isInCart = cart.some((cartItem) => cartItem.id == product.id);
	return (
		<>
			<main className="product-page">
				<img src={product.img} alt="" />
				<div className="product-page__details">
					<h1 className="product-page__details-title">{product.name}</h1>
					<p>€{product.priceCents / 100}</p>
					<div className="btn-container">
						<button
							className="product-page__add-to-cart-btn"
							onClick={() => addToCart(product)}
						>
							{isInCart ? "In cart" : "Add to Cart"}
						</button>
						{/* <button className="wish-btn" onClick={() => addToWish(el)}>
							{isInWish ? (
								<img src={heartIconRed} alt="" />
							) : (
								<img src={heartIcon} alt="" />
							)}
						</button> */}
					</div>
				</div>
			</main>
		</>
	);
};

export default ProductPage;
