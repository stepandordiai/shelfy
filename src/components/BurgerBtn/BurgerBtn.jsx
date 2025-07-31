import "./BurgerBtn.scss";

const BurgerBtn = () => {
	function toggleBurger11() {
		document.querySelector(".burger-11").classList.toggle("burger-11--active");
		document
			.querySelector(".burger-11__center-line")
			.classList.toggle("burger-11__center-line--active");
	}

	return (
		<button onClick={toggleBurger11} className="burger-11">
			<span className="burger-11__center-line"></span>
		</button>
	);
};

export default BurgerBtn;
