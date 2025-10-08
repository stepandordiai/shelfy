import { NavLink } from "react-router-dom";
import "./Footer.scss";

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
						<NavLink className="footer-nav__link" to="/category/t-shirts/mens">
							T-Shirts
						</NavLink>
						<NavLink className="footer-nav__link" to="/category/shorts/mens">
							Shorts
						</NavLink>
						<NavLink className="footer-nav__link" to="/category/sneackers/mens">
							Sneackers
						</NavLink>
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
							<NavLink className="footer-nav__link" to="/category/bags/womens">
								Bags
							</NavLink>
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
