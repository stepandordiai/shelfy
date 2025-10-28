import { NavLink } from "react-router-dom";
import fixedPrice from "../../utils/fixedPrice";
import trashIcon from "/icons/delete.png";
import "./Wish.scss";

const Wish = ({ wish, setWish }) => {
	const removeWishProduct = (id) => {
		setWish((prev) => prev.filter((product) => product.id !== id));
	};

	return (
		<main className="wish">
			<h1 className="wish-title">Wish</h1>
			<div className="wish__items">
				{wish.map((product) => {
					return (
						<NavLink
							to={`/product-page/${product.id}`}
							key={product.id}
							className="wish__item"
						>
							<img width={120} src={product.img} alt="" />
							<div className="wish__item-details">
								<div className="wish__item-details-left">
									<div>
										<p>{product.name}</p>
										<p>€ {fixedPrice(product.priceCents / 100)}</p>
									</div>
								</div>
								<button
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										removeWishProduct(product.id);
									}}
								>
									<img src={trashIcon} width={20} height={20} alt="" />
								</button>
							</div>
						</NavLink>
					);
				})}
			</div>
		</main>
	);
};

export default Wish;
