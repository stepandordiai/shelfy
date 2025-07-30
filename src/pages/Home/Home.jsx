import "./Home.scss";
import productsData from "./../../assets/data/products-data.json";
import heartIcon from "/heart.png";
import heartIconRed from "/heart-red.png";

const Home = ({ wish, cart, addToCart, addToWish }) => {
	return (
		<>
			<div className="grid">
				{productsData.map((el, index) => {
					// TODO:
					const isInCart = cart.some((item) => item.id === el.id);
					const isInWish = wish.some((item) => item.id === el.id);
					return (
						<div key={index} className="card">
							<div className="card__img-container">
								<img src={el.img} alt="" />
							</div>
							<p>{el.name}</p>
							<p>$ {el.priceCents / 100}</p>
							<div className="btn-container">
								<button className="cart-btn" onClick={() => addToCart(el)}>
									{isInCart ? "In cart" : "Add to Cart"}
								</button>
								<button className="wish-btn" onClick={() => addToWish(el)}>
									{isInWish ? (
										<img src={heartIconRed} alt="" />
									) : (
										<img src={heartIcon} alt="" />
									)}
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Home;
