import { NavLink } from "react-router-dom";
import cartIcon from "/market.png";
import "./Header.scss";

const Header = ({ cart }) => {
	return (
		<>
			<header className="header">
				<NavLink className={"header__logo"} to={"/"}>
					Shelfy
				</NavLink>
				<div className="header__cart">
					<img width={30} src={cartIcon} alt="" />
					<p>{cart.length}</p>
				</div>
			</header>
		</>
	);
};

export default Header;
