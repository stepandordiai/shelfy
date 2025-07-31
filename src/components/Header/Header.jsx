import { NavLink } from "react-router-dom";
import cartIcon from "/shopping-bag.png";
import heartIcon from "/heart.png";
import "./Header.scss";
import { useEffect } from "react";
import { useState } from "react";

const Header = ({ cart, wish }) => {
	const showCart = () => {
		document.querySelector(".cart").classList.add("cart--active");
		document.querySelector(".curtain").classList.add("curtain--active");
	};

	const [isVisible, setIsVisible] = useState(false);
	const [type, setType] = useState("");

	const handleVisibility = (props, type) => {
		setIsVisible(props);
		setType((prev) => (prev = type));
		document
			.querySelector(".main-curtain")
			.classList.toggle("main-curtain--active", props);
	};

	return (
		<header className="header">
			<div className="header__top">
				<div className="burger-btn"></div>
				<NavLink className={"header__logo"} to={"/"}>
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
					<NavLink className={"header__wish"} to={"/wish"}>
						<img src={heartIcon} width={20} alt="" />

						{wish.length > 0 && <span>{wish.length}</span>}
					</NavLink>
					<button onClick={showCart} className="header__cart">
						<img width={20} src={cartIcon} alt="" />
						{cart.length > 0 && <span>10</span>}
					</button>
				</div>
			</div>
			<div
				onMouseEnter={() => handleVisibility(true, type)}
				onMouseLeave={() => handleVisibility(false, type)}
				className={`header__bottom ${
					isVisible ? "header__bottom--active" : ""
				}`}
			>
				<div className="header__bottom-container">
					{type === "men" && (
						<>
							<div className="header__bottom-list-container">
								<p style={{ fontSize: "1.2rem" }}>Trending</p>
								<ul>
									<li>New Product Drops</li>
									<li>Whitney Simmons</li>
									<li>Varsity</li>
									<li>Best Sellers</li>
									<li>Running</li>
									<li>Graphics Tees</li>
									<li>Swimwear</li>
								</ul>
							</div>
							<div className="header__bottom-list-container">
								<p style={{ fontSize: "1.2rem" }}>Leggins</p>
								<ul>
									<li>All Leggins</li>
									<li>High-Waisted Leggins</li>
									<li>Scrunch Bum Leggins</li>
									<li>Black Leggins</li>
									<li>Flare Leggins</li>
								</ul>
							</div>
							<div className="header__bottom-list-container">
								<p style={{ fontSize: "1.2rem" }}>Products</p>
								<ul>
									<li>Hello World</li>
									<li>Hello World</li>
									<li>Hello World</li>
									<li>Hello World</li>
									<li>Hello World</li>
								</ul>
							</div>
						</>
					)}
					{type === "women" && (
						<>
							<div className="header__bottom-list-container">
								<p style={{ fontSize: "1.2rem" }}>Women</p>
								<ul>
									<li>Women</li>
									<li>Women</li>
									<li>Women</li>
									<li>Women</li>
									<li>Women</li>
								</ul>
							</div>
							<div className="header__bottom-list-container">
								<p style={{ fontSize: "1.2rem" }}>Hello World</p>
								<ul>
									<li>Women</li>
									<li>Women</li>
									<li>Women</li>
									<li>Women</li>
									<li>Women</li>
								</ul>
							</div>
							<div className="header__bottom-list-container">
								<p style={{ fontSize: "1.2rem" }}>Hello World</p>
								<ul>
									<li>Women</li>
									<li>Women</li>
									<li>Women</li>
									<li>Women</li>
									<li>Women</li>
								</ul>
							</div>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
