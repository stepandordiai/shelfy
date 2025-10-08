import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import heartIcon from "/icons/heart.png";
import heartIconRed from "/icons/heart-red.png";
import "./Home.scss";

const Home = ({ productsData, addToWish, wish }) => {
	return (
		<>
			<Helmet>
				<title>Shelfy - Official store</title>
			</Helmet>
			<main className="home">
				<div className="grid">
					{productsData.map((el, index) => {
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
											<img src={heartIconRed} width={20} height={20} alt="" />
										) : (
											<img src={heartIcon} width={20} height={20} alt="" />
										)}
									</button>
								</div>
								<p style={{ marginTop: "10px" }}>{el.name}</p>
								<p>$ {el.priceCents / 100}</p>
							</NavLink>
						);
					})}
				</div>
			</main>
		</>
	);
};

export default Home;
