import heartIcon from "/heart.png";
import heartIconRed from "/heart-red.png";
import { NavLink } from "react-router-dom";
import "./Home.scss";

const Home = ({ productsData, addToWish, wish }) => {
	return (
		<>
			<div className="grid">
				{productsData.map((el, index) => {
					// TODO:

					return (
						<NavLink
							key={index}
							className="card-link"
							to={`/product-page/${el.id}`}
						>
							<div className="cart-link__img-container">
								<img src={el.img} alt="" />
								<button
									className="wish-btn"
									onClick={(e) => {
										// TODO:
										e.preventDefault(); // Prevent NavLink navigation
										e.stopPropagation(); // Stop bubbling up the click
										addToWish(el);
									}}
								>
									{wish.some((item) => item.id === el.id) ? (
										<img src={heartIconRed} alt="" />
									) : (
										<img src={heartIcon} alt="" />
									)}
								</button>
							</div>
							<p style={{ marginTop: "10px" }}>{el.name}</p>
							<p>$ {el.priceCents / 100}</p>
						</NavLink>
					);
				})}
			</div>
		</>
	);
};

export default Home;
