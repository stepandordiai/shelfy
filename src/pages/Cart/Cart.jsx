import "./Cart.scss";

const Cart = ({ cart, setCart }) => {
	const decrease = (id) => {
		setCart((prevCart) =>
			prevCart.map((el) => {
				if (el.id === id) {
					if (el.cartQty > 1) {
						return { ...el, cartQty: el.cartQty - 1 };
					} else {
						return el;
					}
				}
			})
		);
	};

	const increase = (id) => {
		setCart((prevCart) =>
			prevCart.map((el) =>
				el.id === id ? { ...el, cartQty: el.cartQty + 1 } : el
			)
		);
	};

	const remove = (id) => {
		setCart((prevCart) => prevCart.filter((el) => el.id !== id));
	};

	// setCart((prevCart) => (prevCart = [])); mine
	const removeCart = () => {
		setCart([]);
	};

	const initValue = 0;
	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.cartQty,
		initValue
	);

	const totalItems = cart.reduce((sum, item) => sum + item.cartQty, initValue);

	return (
		<>
			<main>
				<h1>Cart</h1>
				<button onClick={removeCart}>Remove all products</button>
				<p>Total items: {totalItems}</p>
				<h2>Total price: {totalPrice}</h2>
				<div className="cart-products">
					{cart.map((el, index) => {
						return (
							<div key={index}>
								<img src={el.img} alt="" />
								<p>{el.name}</p>
								<p>{el.cartQty}</p>
								<div>
									<button onClick={() => decrease(el.id)}>-</button>
									<button onClick={() => increase(el.id)}>+</button>
									<button onClick={() => remove(el.id)}>remove</button>
								</div>
								<div>
									<div>
										<label htmlFor="free">Free</label>
										<input type="radio" />
									</div>
									<div>
										<label htmlFor="5">5$</label>
										<input type="radio" />
									</div>
									<div>
										<label htmlFor="10">10$</label>
										<input type="radio" />
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</main>
		</>
	);
};

export default Cart;
