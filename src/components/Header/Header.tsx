import { useState } from "react";
import productsData from "../../data/products-data.json";
// import type { Cart } from "../../interfaces/Cart";
import type { Product } from "../../interfaces/Product";
import { NavLink } from "react-router-dom";
import cartIcon from "/icons/shopping-bag.png";
import heartIcon from "/icons/heart.png";
import userIcon from "/icons/user.png";
import "./Header.scss";

const uniqueWomensTypes = [
	...new Set(
		productsData
			.filter((product) => product.sex === "womens")
			.map((product) => product.type)
	),
];

const uniqueMensTypes = [
	...new Set(
		productsData
			.filter((product) => product.sex === "mens")
			.map((product) => product.type)
	),
];

type HeaderProps = {
	cart: Product[];
	wish: Product[];
	setIsCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ cart, wish, setIsCartVisible }: HeaderProps) => {
	const [isHeaderNavVisible, setIsHeaderNavVisible] = useState(false);
	const [type, setType] = useState("");
	const [menuActive, setMenuActive] = useState(false);

	const handleMenuActive = () => {
		setMenuActive((prev) => !prev);
	};

	const handleVisibility = (props: boolean, type: string) => {
		setIsHeaderNavVisible(props);
		setType(type);
	};

	return (
		<>
			<header className="header">
				<div className="header__top">
					<button
						onClick={handleMenuActive}
						className={`burger-btn ${menuActive ? "burger-btn--active" : ""}`}
					>
						<span
							className={`burger-btn__center-line ${
								menuActive ? "burger-btn__center-line--active" : ""
							}`}
						></span>
					</button>
					<NavLink className="header__logo" to="/">
						Shelfy
					</NavLink>
					<nav className="header__nav">
						<div
							onMouseEnter={() => handleVisibility(true, "women")}
							onMouseLeave={() => handleVisibility(false, "women")}
							className="header__nav-link header__nav-dd"
						>
							Women
						</div>
						<div
							onMouseEnter={() => handleVisibility(true, "men")}
							onMouseLeave={() => handleVisibility(false, "men")}
							className="header__nav-link header__nav-dd"
						>
							Men
						</div>
						<div className="header__nav-link">Accessories</div>
					</nav>
					<div className="header__right-section">
						<NavLink className="header__wish" to="/wish">
							<img src={heartIcon} width={20} height={20} alt="" />

							{wish.length > 0 && <span>{wish.length}</span>}
						</NavLink>
						<NavLink to="/login">
							<img src={userIcon} width={20} height={20} alt="" />
						</NavLink>
						<button
							onClick={() => setIsCartVisible(true)}
							className="header__cart"
						>
							<img width={20} height={20} src={cartIcon} alt="" />
							{cart.length > 0 && <span>{cart.length}</span>}
						</button>
					</div>
				</div>
				<div
					onMouseEnter={() => handleVisibility(true, type)}
					onMouseLeave={() => handleVisibility(false, type)}
					className={`header__bottom ${
						isHeaderNavVisible ? "header__bottom--active" : ""
					}`}
				>
					<div className="header__bottom-container">
						{type === "men" && (
							<div className="header__bottom-list-container">
								<p style={{ fontSize: "1.2rem", marginBottom: 10 }}>Products</p>
								<div className="header-bottom__nav-list">
									<NavLink
										onClick={() => handleVisibility(false, "men")}
										className="header-bottom__nav-link"
										to="/category/all/mens"
									>
										All products
									</NavLink>
									{uniqueMensTypes.map((type, index) => {
										return (
											<NavLink
												key={index}
												onClick={() => handleVisibility(false, "men")}
												className="header-bottom__nav-link"
												to={`/category/${type}/mens`}
											>
												{(type[0] as string).toUpperCase() + type.slice(1)}
											</NavLink>
										);
									})}
								</div>
							</div>
						)}
						{type === "women" && (
							<div className="header__bottom-list-container">
								<p style={{ fontSize: "1.2rem", marginBottom: 10 }}>Products</p>
								<div className="header-bottom__nav-list">
									<NavLink
										onClick={() => handleVisibility(false, "women")}
										className="header-bottom__nav-link"
										to="/category/all/womens"
									>
										All products
									</NavLink>
									{uniqueWomensTypes.map((type, index) => {
										return (
											<NavLink
												key={index}
												onClick={() => handleVisibility(false, "women")}
												className="header-bottom__nav-link"
												to={`/category/${type}/womens`}
											>
												{(type[0] as string).toUpperCase() + type.slice(1)}
											</NavLink>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			</header>
			<div className={`menu ${menuActive ? "menu--active" : ""}`}>
				<div className="menu-container">
					<button className="menu__btn">Mens</button>
					<div className="menu__dd">
						<div className="menu__dd-inner">
							<NavLink
								onClick={() => {
									setMenuActive(false);
								}}
								className="header-bottom__nav-link"
								to="/category/all/mens"
							>
								All products
							</NavLink>
							{uniqueMensTypes.map((type, index) => {
								return (
									<NavLink
										key={index}
										onClick={() => {
											setMenuActive(false);
										}}
										className="header-bottom__nav-link"
										to={`/category/${type}/mens`}
									>
										{(type[0] as string).toUpperCase() + type.slice(1)}
									</NavLink>
								);
							})}
						</div>
					</div>
				</div>
				<div className="menu-container">
					<button className="menu__btn">Womens</button>
					<div className="menu__dd">
						<div className="menu__dd-inner">
							<NavLink
								onClick={() => {
									setMenuActive(false);
								}}
								className="header-bottom__nav-link"
								to="/category/all/womens"
							>
								All products
							</NavLink>
							{uniqueWomensTypes.map((type, index) => {
								return (
									<NavLink
										key={index}
										onClick={() => {
											setMenuActive(false);
										}}
										className="header-bottom__nav-link"
										to={`/category/${type}/womens`}
									>
										{(type[0] as string).toUpperCase() + type.slice(1)}
									</NavLink>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div
				className={`main-curtain ${
					isHeaderNavVisible ? "main-curtain--active" : ""
				}`}
			></div>
		</>
	);
};

export default Header;
