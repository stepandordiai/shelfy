import productsData from "../../data/products-data.json";
import { NavLink } from "react-router-dom";
import "./Footer.scss";

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

const Footer = () => {
	return (
		<footer className="footer">
			<NavLink className="footer__logo" to="/">
				Shelfy
			</NavLink>
			<nav className="footer-nav">
				<div>
					<p style={{ marginBottom: 10 }}>Mens</p>
					<div style={{ display: "flex", flexDirection: "column", rowGap: 5 }}>
						<NavLink className="footer-nav__link" to="/category/all/mens">
							All products
						</NavLink>
						{uniqueMensTypes.map((type: string, index) => {
							return (
								<NavLink
									key={index}
									className="footer-nav__link"
									to={`/category/${type}/mens`}
								>
									{/* Make the first letter Capitalize */}
									{(type[0] as string).toUpperCase() + type.slice(1)}
								</NavLink>
							);
						})}
					</div>
				</div>
				<div className="menu-container">
					<p style={{ marginBottom: 10 }}>Womens</p>
					<div>
						<div
							style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
						>
							<NavLink className="footer-nav__link" to="/category/all/womens">
								All products
							</NavLink>
							{uniqueWomensTypes.map((type, index) => {
								return (
									<NavLink
										key={index}
										className="footer-nav__link"
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
			<div className="footer-bottom">
				<p>&copy; 2025 Shelfy. All rights reserved.</p>
				<p>
					Made with love by{" "}
					<a href="https://stepandordiai.netlify.app/" target="_blank">
						STEPAN DORDIAI
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
