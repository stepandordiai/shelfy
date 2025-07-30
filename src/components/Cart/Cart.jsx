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
		<div className="cart">
			<p className="cart__title">Cart</p>
			<button onClick={removeCart}>Remove all products</button>
			<p>Total items: {totalItems}</p>
			<h2>Total price: {totalPrice}</h2>
			<div className="cart__items">
				{cart.map((cartItem) => {
					return (
						<div key={cartItem.id} className="cart__item">
							<img width={160} src={cartItem.img} alt="" />
							<div>
								<p>{cartItem.name}</p>
								<p>€{cartItem.priceCents / 100}</p>
							</div>
							<div>
								<button onClick={() => decrease(cartItem.id)}>-</button>
								<button onClick={() => increase(cartItem.id)}>+</button>
								<button onClick={() => remove(cartItem.id)}>remove</button>
							</div>
							{/* <div>
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
								</div> */}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Cart;
