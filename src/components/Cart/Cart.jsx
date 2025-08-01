import heartIcon from "/heart.png";
import heartIconRed from "/heart-red.png";
import trashIcon from "/delete.png";
import "./Cart.scss";

const Cart = ({ cart, setCart, wish, addToWish }) => {
	// const decrease = (id) => {
	// 	setCart((prevCart) =>
	// 		prevCart.map((el) => {
	// 			if (el.id === id) {
	// 				if (el.cartQty > 1) {
	// 					return { ...el, cartQty: el.cartQty - 1 };
	// 				} else {
	// 					return el;
	// 				}
	// 			}
	// 		})
	// 	);
	// };

	// const increase = (id) => {
	// 	setCart((prevCart) =>
	// 		prevCart.map((el) =>
	// 			el.id === id ? { ...el, cartQty: el.cartQty + 1 } : el
	// 		)
	// 	);
	// };

	const handleItemQty = (id, value) => {
		setCart((prevCart) =>
			prevCart.map((el) =>
				el.id === id ? { ...el, cartQty: Number(value) } : el
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

	const totalPrice = cart.reduce(
		(sum, item) => sum + (item.priceCents / 100) * item.cartQty,
		0
	);

	const totalItems = cart.reduce((sum, item) => sum + item.cartQty, 0);

	return (
		<div className="cart">
			<p className="cart__title">Cart</p>
			<button onClick={removeCart}>Remove all products</button>
			<p>Total items: {totalItems}</p>
			<h2>Total price: €{totalPrice}</h2>
			<div className="cart__items">
				{cart.map((cartItem) => {
					return (
						<div key={cartItem.id} className="cart__item">
							<img width={120} src={cartItem.img} alt="" />
							<div className="cart__item-details">
								<div>
									<div>
										<p>{cartItem.name}</p>
										<p>€{cartItem.priceCents / 100}</p>
									</div>
									<button
										className="cart__wish-btn"
										onClick={(e) => {
											// TODO:
											e.preventDefault(); // Prevent NavLink navigation
											e.stopPropagation(); // Stop bubbling up the click
											addToWish(cartItem);
										}}
									>
										{wish.some((item) => item.id == cartItem.id) ? (
											<img src={heartIconRed} width={20} height={20} alt="" />
										) : (
											<img src={heartIcon} width={20} height={20} alt="" />
										)}
									</button>
									<div>
										{/* <button onClick={() => decrease(cartItem.id)}>-</button> */}
										{/* <p>{cartItem.cartQty}</p> */}
										{/* <button onClick={() => increase(cartItem.id)}>+</button> */}
										<select
											onChange={(e) =>
												handleItemQty(cartItem.id, e.target.value)
											}
											className="cart__input-qty"
											name=""
											id=""
										>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
											<option value="9">9</option>
											<option value="10">10</option>
										</select>
									</div>
								</div>
								<button onClick={() => remove(cartItem.id)}>
									<img src={trashIcon} width={20} height={20} alt="" />{" "}
								</button>
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
			<div className="cart__footer">
				<button className="cart__checkout-btn">Checkout</button>
			</div>
		</div>
	);
};

export default Cart;
