import "./Home.scss";
import booksData from "./../../data/books-data.json";
import { useState } from "react";
import { useEffect } from "react";

const Home = ({ wish, cart, addToCart, addToWish }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		setData(booksData);
	});

	return (
		<>
			<div className="grid">
				{data.map((el, index) => {
					// TODO:
					const isInCart = cart.some((item) => item.id === el.id);
					const isInWish = wish.some((item) => item.id === el.id);
					return (
						<div key={index} className="card">
							<img height={200} src={el.img} alt="" />
							<p>{el.name}</p>
							<p>{el.price}$</p>
							<button onClick={() => addToCart(el)}>
								{isInCart ? "In cart" : "Add to Cart"}
							</button>
							<button onClick={() => addToWish(el)}>
								{isInWish ? "In wish" : "Add to Wish"}
							</button>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Home;
