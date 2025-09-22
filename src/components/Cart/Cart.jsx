import heartIcon from "/heart.png";
import heartIconRed from "/heart-red.png";
import trashIcon from "/delete.png";
import closeIcon from "/close.png";
import { useEffect } from "react";
import "./Cart.scss";

const Cart = ({ cart, setCart, wish, addToWish, hideCart }) => {
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

	// const handleItemQty = (id, value) => {
	// 	setCart((prevCart) =>
	// 		prevCart.map((el) =>
	// 			el.id === id ? { ...el, cartQty: Number(value) } : el
	// 		)
	// 	);
	// };

	const decrease = (id, size) => {
		setCart((prevCart) =>
			prevCart.map((el) =>
				el.id === id && el.productSize === size
					? { ...el, cartQty: el.cartQty - 1 }
					: el
			)
		);
	};

	const increase = (id, size) => {
		setCart((prevCart) =>
			prevCart.map((el) =>
				el.id === id && el.productSize === size
					? { ...el, cartQty: el.cartQty + 1 }
					: el
			)
		);
	};

	const remove = (id, size) => {
		setCart((prevCart) =>
			prevCart.filter((el) => el.id !== id || el.productSize !== size)
		);
	};

	// setCart((prevCart) => (prevCart = [])); mine
	// const removeCart = () => {
	// 	setCart([]);
	// };

	const handleCheckout = (e) => {
		e.target.innerHTML = "Checkout is disabled on this site.";
		e.target.style.backgroundColor = "#f00";
		e.target.disabled = true;
		e.target.style.cursor = "not-allowed";

		setTimeout(() => {
			e.target.innerHTML = "Checkout";
			e.target.style.backgroundColor = "#000";
			e.target.disabled = false;
			e.target.style.cursor = "pointer";
		}, 3000);
	};

	const handleDiscount = (e) => {
		e.preventDefault();
		e.target.style.backgroundColor = "rgba(255, 0, 0, 0.05)";
		const parent = e.target.parentNode;
		const invalidDiscountTxt = parent.querySelector("span");
		// TODO:
		if (!invalidDiscountTxt) {
			parent.insertAdjacentHTML(
				"beforeend",
				"<span>The discount code is invalid or not applicable.</span>"
			);
		}
	};

	const totalPrice = cart.reduce(
		(sum, item) => sum + (item.priceCents / 100) * item.cartQty,
		0
	);

	// const totalItems = cart.reduce((sum, item) => sum + item.cartQty, 0);

	const deliveryPrice = 5;
	const freeDelivery = 75;

	const checkDelivery = () => {
		return freeDelivery - totalPrice;
	};

	useEffect(() => {
		const progressBar = document.querySelector(".progress-bar div");

		const calcWidth = Math.min((totalPrice * 100) / 75, 100);

		progressBar.style.width = calcWidth + "%";
	}, [totalPrice]);

	return (
		<div className="cart">
			<div className="cart__header">
				<p className="cart__title">Cart</p>
				<button onClick={hideCart} className="cart__header-close-btn">
					<img src={closeIcon} width={25} alt="" />
				</button>
			</div>
			<div style={{ marginTop: 10, marginBottom: 10 }}>
				{totalPrice < freeDelivery ? (
					<p>You're € {checkDelivery()} away from Free Standard Shipping</p>
				) : (
					<p>You've qualified for Free Standard Shipping</p>
				)}

				<div className="progress-bar">
					<div></div>
				</div>
				<p
					style={{
						display: "flex",
						justifyContent: "space-between",
						color: "hsl(0, 0%, 50%)",
					}}
				>
					<span>€ 0</span>
					<span>€ 75</span>
				</p>
			</div>
			{cart.length === 0 ? (
				<div style={{ margin: "auto" }}>Your cart is empty</div>
			) : (
				<>
					<div className="cart__inner">
						{/* <button style={{ marginBottom: 10 }} onClick={removeCart}>
					Remove all products
				</button> */}
						<div className="cart__items">
							{cart.length === 0 ? (
								<div style={{ margin: "auto" }}>Your cart is empty</div>
							) : (
								cart.map((cartItem) => {
									return (
										<div key={cartItem.id} className="cart__item">
											<img width={120} src={cartItem.img} alt="" />
											<div className="cart__item-details">
												<div className="cart__item-details-left">
													<div>
														<p>{cartItem.name}</p>
														<p>€ {cartItem.priceCents / 100}</p>
														<p>Size: {cartItem.productSize}</p>
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
															<img
																src={heartIconRed}
																width={20}
																height={20}
																alt=""
															/>
														) : (
															<img
																src={heartIcon}
																width={20}
																height={20}
																alt=""
															/>
														)}
													</button>
													<div className="cart-qty-container">
														<button
															onClick={() =>
																decrease(cartItem.id, cartItem.productSize)
															}
															disabled={cartItem.cartQty === 1}
														>
															-
														</button>
														<p>{cartItem.cartQty}</p>
														<button
															onClick={() =>
																increase(cartItem.id, cartItem.productSize)
															}
															disabled={cartItem.cartQty === 10}
														>
															+
														</button>
													</div>
												</div>
												<button
													onClick={() =>
														remove(cartItem.id, cartItem.productSize)
													}
												>
													<img src={trashIcon} width={20} height={20} alt="" />
												</button>
											</div>
										</div>
									);
								})
							)}
						</div>
						<div className="cart__discount">
							<p style={{ marginBottom: 10 }}>Discount code?</p>
							<form
								style={{ marginBottom: 10 }}
								onSubmit={handleDiscount}
								className="cart__discount-form"
								action=""
							>
								<input type="text" placeholder="Enter code" />
								<button type="submit">Apply</button>
							</form>
						</div>
						<strong style={{ marginBottom: 10 }}>Order summary</strong>
						<div className="cart__summary">
							<p style={{ display: "flex", justifyContent: "space-between" }}>
								<span>Sub Total</span>
								<span>€ {totalPrice}</span>
							</p>
							<p style={{ display: "flex", justifyContent: "space-between" }}>
								<span>Shipping</span>
								<span>{checkDelivery() > 0 ? "€ 5" : "Free"}</span>
							</p>
							<strong
								style={{ display: "flex", justifyContent: "space-between" }}
							>
								<span>Total</span>
								<span>
									€{" "}
									{checkDelivery() > 0
										? totalPrice + deliveryPrice
										: totalPrice}
								</span>
							</strong>
						</div>
					</div>
					<div className="cart__footer">
						<button onClick={handleCheckout} className="cart__checkout-btn">
							Checkout
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
