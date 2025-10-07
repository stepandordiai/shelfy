import "./Login.scss";

const Login = () => {
	return (
		<main className="login">
			<h1>Login</h1>
			{/* <form action=""></form> */}
			<input type="email" placeholder="Email" />
			<input type="text" placeholder="First Name" />
			<input type="text" placeholder="Last Name" />
			<input type="password" placeholder="Password" />
			<button type="submit">Create account</button>
		</main>
	);
};

export default Login;
