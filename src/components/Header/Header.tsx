import { useEffect, useRef, useState } from "react";
import productsData from "../../data/products-data.json";
import type { Product } from "../../interfaces/Product";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
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
	isCartVisible: boolean;
	setIsCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({
	cart,
	wish,
	isCartVisible,
	setIsCartVisible,
}: HeaderProps) => {
	const [isHeaderNavVisible, setIsHeaderNavVisible] = useState(false);
	const [type, setType] = useState("");
	const [menuOpen, setMenuOpen] = useState(false);

	const menu = useRef(null);
	const menuBtn = useRef(null);

	const toggleMenu = (): void => setMenuOpen((prev: boolean) => !prev);

	// TODO: LEARN THIS
	useEffect(() => {
		if (!menuOpen) return;

		const closeMenu = (e: MouseEvent | TouchEvent): void => {
			const menuCurrent = menu.current as HTMLElement | null;
			const menuBtnCurrent = menuBtn.current as HTMLButtonElement | null;

			if (!(e.target instanceof Node)) return;

			if (
				!menuCurrent?.contains(e.target) &&
				!menuBtnCurrent?.contains(e.target)
			) {
				setMenuOpen(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [menuOpen]);

	const handleVisibility = (props: boolean, type: string) => {
		setIsHeaderNavVisible(props);
		setType(type);
	};

	return (
		<>
			<header className="header">
				<div className="header__top">
					{/* menu-btn */}
					<button
						ref={menuBtn}
						onClick={toggleMenu}
						className={classNames("burger-btn", {
							"burger-btn--active": menuOpen,
						})}
						aria-label={menuOpen ? "Close menu" : "Open menu"}
						aria-expanded={menuOpen}
						aria-controls="menu"
					>
						<span
							className={classNames("burger-btn__center-line", {
								"burger-btn__center-line--active": menuOpen,
							})}
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
							aria-label={
								cart.length === 0
									? "Shopping cart, empty"
									: cart.length === 1
									? `Shopping cart, ${cart.length} item`
									: `Shopping cart, ${cart.length} items`
							}
							aria-expanded={isCartVisible}
						>
							<img width={20} height={20} src={cartIcon} alt="" />
							{cart.length > 0 && <span aria-hidden="true">{cart.length}</span>}
						</button>
					</div>
				</div>
				<div
					onMouseEnter={() => handleVisibility(true, type)}
					onMouseLeave={() => handleVisibility(false, type)}
					className={classNames("header__bottom", {
						"header__bottom--active": isHeaderNavVisible,
					})}
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
			{/* menu */}
			<nav
				ref={menu}
				className={classNames("menu", {
					"menu--active": menuOpen,
				})}
				id="menu"
				aria-hidden={!menuOpen}
			>
				<div className="menu-container">
					<p className="menu__btn">Mens</p>
					<div className="menu__dd">
						<div className="menu__dd-inner">
							<NavLink
								onClick={() => {
									setMenuOpen(false);
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
											setMenuOpen(false);
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
					<p className="menu__btn">Womens</p>
					<div className="menu__dd">
						<div className="menu__dd-inner">
							<NavLink
								onClick={() => {
									setMenuOpen(false);
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
											setMenuOpen(false);
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
			</nav>
			<div
				className={classNames("main-curtain", {
					"main-curtain--active": isHeaderNavVisible,
				})}
			></div>
		</>
	);
};

export default Header;
