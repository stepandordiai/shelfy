import { useState } from "react";
import { NavLink } from "react-router-dom";
import fixedPrice from "../../utils/fixedPrice";
import heartIcon from "/icons/heart.png";
import heartIconRed from "/icons/heart-red.png";
import trashIcon from "/icons/delete.png";
import closeIcon from "/icons/close.png";
import "./Cart.scss";

import type { Product } from "../../interfaces/Product";

interface CartInterface extends Product {
	productSize: string;
	cartQty: number;
}

type CartProps = {
	cart: CartInterface[];
	setCart: React.Dispatch<React.SetStateAction<CartInterface[]>>;
	wish: Product[];
	addToWish: (item: Product) => void;
	isCartVisible: boolean;
	setIsCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart = ({
	cart,
	setCart,
	wish,
	addToWish,
	isCartVisible,
	setIsCartVisible,
}: CartProps) => {
	const [checkoutBtnDisabled, setCheckoutBtnDisabled] = useState(false);
	const [discountBtnActive, setDiscountBtnActive] = useState(false);

	const decreaseItemQty = (id: number, size: string) => {
		setCart((prev) =>
			prev.map((item) =>
				// TODO:
				item.id === id && item.productSize === size
					? { ...item, cartQty: item.cartQty - 1 }
					: item
			)
		);
	};

	const increaseItemQty = (id: number, size: string) => {
		setCart((prev) =>
			prev.map((item) =>
				item.id === id && item.productSize === size
					? { ...item, cartQty: item.cartQty + 1 }
					: item
			)
		);
	};

	const removeItem = (id: number, size: string) => {
		setCart((prev) =>
			// TODO:
			prev.filter((item) => item.id !== id || item.productSize !== size)
		);
	};

	const handleCheckoutBtnDisabled = () => {
		setCheckoutBtnDisabled(true);

		setTimeout(() => {
			setCheckoutBtnDisabled(false);
		}, 3000);
	};

	const handleDiscountForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDiscountBtnActive(true);

		setTimeout(() => {
			setDiscountBtnActive(false);
		}, 3000);
	};

	const totalPrice = cart.reduce(
		(sum, item) => sum + (item.priceCents / 100) * item.cartQty,
		0
	);

	const deliveryPrice = 5;
	const freeDelivery = 75;

	console.log(cart);

	const calcProgressBarWidth = Math.min((totalPrice * 100) / freeDelivery, 100);

	return (
		<div className={isCartVisible ? "cart cart--active" : "cart"}>
			<div className="cart__header">
				<p className="cart__title">Cart</p>
				<button
					onClick={() => setIsCartVisible(false)}
					className="cart__header-close-btn"
				>
					<img src={closeIcon} width={25} alt="" />
				</button>
			</div>
			<div style={{ marginTop: 10, marginBottom: 10 }}>
				{totalPrice < freeDelivery ? (
					<p>
						You're € {freeDelivery - totalPrice} away from Free Standard
						Shipping
					</p>
				) : (
					<p>You've qualified for Free Standard Shipping</p>
				)}

				<div className="progress-bar">
					<div style={{ width: calcProgressBarWidth + "%" }}></div>
				</div>
				<p
					style={{
						display: "flex",
						justifyContent: "space-between",
						color: "hsl(0, 0%, 50%)",
					}}
				>
					<span>€ 0</span>
					<span>€ {freeDelivery}</span>
				</p>
			</div>
			{cart.length === 0 ? (
				<div className="cart__empty-container">
					<p>Your cart is empty</p>
					<NavLink
						onClick={() => setIsCartVisible(false)}
						className="cart__link"
						to="/category/all/mens"
					>
						Shop Mens
					</NavLink>
					<NavLink
						onClick={() => setIsCartVisible(false)}
						className="cart__link"
						to="/category/all/womens"
					>
						Shop Womens
					</NavLink>
				</div>
			) : (
				<>
					<div className="cart__inner">
						{/* <button style={{ marginBottom: 10 }} onClick={removeCart}>
					Remove all products
				</button> */}
						<div className="cart__items">
							{cart.map((cartItem) => {
								return (
									<div key={cartItem.id} className="cart__item">
										<img width={120} src={cartItem.img} alt="" />
										<div className="cart__item-details">
											<div className="cart__item-details-left">
												<div>
													<p>{cartItem.name}</p>
													<p>€ {fixedPrice(cartItem.priceCents / 100)}</p>
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
															decreaseItemQty(cartItem.id, cartItem.productSize)
														}
														disabled={cartItem.cartQty === 1}
													>
														-
													</button>
													<p>{cartItem.cartQty}</p>
													<button
														onClick={() =>
															increaseItemQty(cartItem.id, cartItem.productSize)
														}
														disabled={cartItem.cartQty === 10}
													>
														+
													</button>
												</div>
											</div>
											<button
												onClick={() =>
													removeItem(cartItem.id, cartItem.productSize)
												}
											>
												<img src={trashIcon} width={20} height={20} alt="" />
											</button>
										</div>
									</div>
								);
							})}
						</div>
						<div className="cart__discount">
							<p style={{ marginBottom: 10 }}>Discount code?</p>
							<form
								style={
									discountBtnActive
										? { backgroundColor: "rgba(255, 0, 0, 0.05)" }
										: { backgroundColor: "rgba(0, 0, 0, 0.05)" }
								}
								onSubmit={handleDiscountForm}
								className="cart__discount-form"
								action=""
							>
								<input type="text" placeholder="Enter code" />
								<button type="submit">Apply</button>
							</form>
							{discountBtnActive && (
								<span>The discount code is invalid or not applicable.</span>
							)}
						</div>
						<strong style={{ marginBottom: 10 }}>Order summary</strong>
						<div className="cart__summary">
							<p style={{ display: "flex", justifyContent: "space-between" }}>
								<span>Sub Total</span>
								<span>€ {fixedPrice(totalPrice)}</span>
							</p>
							<p style={{ display: "flex", justifyContent: "space-between" }}>
								<span>Shipping</span>
								<span>
									{freeDelivery - totalPrice > 0
										? `€ ${deliveryPrice}`
										: "Free"}
								</span>
							</p>
							<strong
								style={{ display: "flex", justifyContent: "space-between" }}
							>
								<span>Total</span>
								<span>
									€{" "}
									{freeDelivery - totalPrice > 0
										? fixedPrice(totalPrice + deliveryPrice)
										: fixedPrice(totalPrice)}
								</span>
							</strong>
						</div>
					</div>
					<div className="cart__footer">
						<button
							onClick={handleCheckoutBtnDisabled}
							className={`cart__checkout-btn ${
								checkoutBtnDisabled ? "cart__checkout-btn--disabled" : ""
							}`}
							disabled={checkoutBtnDisabled}
						>
							{checkoutBtnDisabled
								? "Checkout is temporary disabled."
								: "Checkout"}
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
