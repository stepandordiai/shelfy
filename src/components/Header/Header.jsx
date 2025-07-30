import { NavLink } from "react-router-dom";
import cartIcon from "/shopping-bag.png";
import heartIcon from "/heart.png";
import "./Header.scss";

const Header = ({ cart, wish }) => {
	const showCart = () => {
		document.querySelector(".cart").classList.add("cart--active");
		document.querySelector(".curtain").classList.add("curtain--active");
	};

	return (
		<header className="header">
			<NavLink className={"header__logo"} to={"/"}>
				Shelfy
			</NavLink>
			<div className="header__right-section">
				<NavLink className={"header__wish"} to={"/wish"}>
					<img src={heartIcon} width={25} alt="" />

					{wish.length > 0 && <span>{wish.length}</span>}
				</NavLink>
				<button onClick={showCart} className="header__cart">
					<img width={25} src={cartIcon} alt="" />
					{cart.length > 0 && <span>{cart.length}</span>}
				</button>
			</div>
		</header>
	);
};

export default Header;
