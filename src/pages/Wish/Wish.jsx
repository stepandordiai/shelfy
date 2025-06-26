import "./Wish.scss";

const Wish = ({ wish }) => {
	return (
		<>
			<main>
				<h1>Wish</h1>
				<div className="cart-products">
					{wish.map((el, index) => {
						return (
							<div key={index}>
								<img src={el.img} alt="" />
								<p>{el.name}</p>
							</div>
						);
					})}
				</div>
			</main>
		</>
	);
};

export default Wish;
