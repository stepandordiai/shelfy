import { NavLink } from "react-router-dom";
import cartIcon from "/market.png";
import "./Header.scss";

const Header = ({ cart, wish }) => {
	return (
		<header className="header">
			<NavLink className={"header__logo"} to={"/"}>
				Shelfy
			</NavLink>

			<NavLink to={"/wish"}>Wish{wish.length}</NavLink>
			<NavLink to={"/cart"} className="header__cart">
				<img width={30} src={cartIcon} alt="" />
				<p>{cart.length}</p>
			</NavLink>
		</header>
	);
};

export default Header;
