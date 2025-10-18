import { NavLink } from "react-router-dom";
import { useState } from "react";
import cartIcon from "/icons/shopping-bag.png";
import heartIcon from "/icons/heart.png";
import userIcon from "/icons/user.png";
import "./Header.scss";

const Header = ({ cart, wish, setIsCartVisible }) => {
	const [isHeaderNavVisible, setIsHeaderNavVisible] = useState(false);
	const [type, setType] = useState("");
	const [menuActive, setMenuActive] = useState(false);

	const handleMenuActive = () => {
		setMenuActive((prev) => !prev);
	};

	const handleVisibility = (props, type) => {
		setIsHeaderNavVisible(props);
		setType(type);
	};

	return (
		<>
			<header className="header">
				<div className="header__top">
					<button
						onClick={handleMenuActive}
						className={
							menuActive ? "burger-btn burger-btn--active" : "burger-btn"
						}
					>
						<span
							className={
								menuActive
									? "burger-btn__center-line burger-btn__center-line--active"
									: "burger-btn__center-line"
							}
						></span>
					</button>
					<NavLink className={"header__logo"} to="/">
						Shelfy
					</NavLink>
					<nav className="header__nav">
						<NavLink
							onMouseEnter={() => handleVisibility(true, "women")}
							onMouseLeave={() => handleVisibility(false, "women")}
							className="header__nav-link header__nav-dd"
						>
							Women
						</NavLink>
						<NavLink
							onMouseEnter={() => handleVisibility(true, "men")}
							onMouseLeave={() => handleVisibility(false, "men")}
							className="header__nav-link header__nav-dd"
						>
							Men
						</NavLink>
						<NavLink className="header__nav-link">Accessories</NavLink>
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
							<>
								<div className="header__bottom-list-container">
									<p style={{ fontSize: "1.2rem", marginBottom: 10 }}>
										Products
									</p>
									<div className="header-bottom__nav-list">
										<NavLink
											onClick={() => handleVisibility(false, "men")}
											className="header-bottom__nav-link"
											to="/category/all/mens"
										>
											All products
										</NavLink>
										<NavLink
											onClick={() => handleVisibility(false, "men")}
											className="header-bottom__nav-link"
											to="/category/t-shirts/mens"
										>
											T-Shirts
										</NavLink>
										<NavLink
											onClick={() => handleVisibility(false, "men")}
											className="header-bottom__nav-link"
											to="/category/shorts/mens"
										>
											Shorts
										</NavLink>
										<NavLink
											onClick={() => handleVisibility(false, "men")}
											className="header-bottom__nav-link"
											to="/category/sneackers/mens"
										>
											Sneackers
										</NavLink>
									</div>
								</div>
							</>
						)}
						{type === "women" && (
							<>
								<div className="header__bottom-list-container">
									<p style={{ fontSize: "1.2rem", marginBottom: 10 }}>
										Products
									</p>
									<div className="header-bottom__nav-list">
										<NavLink
											onClick={() => handleVisibility(false, "women")}
											className="header-bottom__nav-link"
											to="/category/all/womens"
										>
											All products
										</NavLink>
										<NavLink
											onClick={() => handleVisibility(false, "women")}
											className="header-bottom__nav-link"
											to="/category/bags/womens"
										>
											Bags
										</NavLink>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</header>
			<div className={menuActive ? "menu menu--active" : "menu"}>
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
							<NavLink
								onClick={() => {
									setMenuActive(false);
								}}
								className="header-bottom__nav-link"
								to="/category/t-shirts/mens"
							>
								T-Shirts
							</NavLink>
							<NavLink
								onClick={() => {
									setMenuActive(false);
								}}
								className="header-bottom__nav-link"
								to="/category/shorts/mens"
							>
								Shorts
							</NavLink>
							<NavLink
								onClick={() => {
									setMenuActive(false);
								}}
								className="header-bottom__nav-link"
								to="/category/sneackers/mens"
							>
								Sneackers
							</NavLink>
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
							<NavLink
								onClick={() => {
									setMenuActive(false);
								}}
								className="header-bottom__nav-link"
								to="/category/bags/womens"
							>
								Bags
							</NavLink>
						</div>
					</div>
				</div>
			</div>
			<div
				className={
					isHeaderNavVisible
						? "main-curtain main-curtain--active"
						: "main-curtain"
				}
			></div>
		</>
	);
};

export default Header;
