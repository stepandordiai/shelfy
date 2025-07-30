// import heartIcon from "/heart.png";
// import heartIconRed from "/heart-red.png";
import { NavLink } from "react-router-dom";
import "./Home.scss";

const Home = ({ productsData }) => {
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
							<img src={el.img} alt="" />
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
