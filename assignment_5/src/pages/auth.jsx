import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function AuthPage() {
	const [email, setEmail] = useState("");
	const [pw, setPw] = useState("");
	const navigate = useNavigate();

	const register = () => {
		createUserWithEmailAndPassword(auth, email, pw).then((userCredentials) => {
			const user = userCredentials.user
			localStorage.setItem("user", JSON.stringify(user))
			navigate("/contacts")
		}).catch(error => alert(error.message))
	}

	const login = () => {
		signInWithEmailAndPassword(auth, email, pw).then((userCredential) => {
			const user = userCredential.user;
			localStorage.setItem("user", JSON.stringify(user))
			navigate("/contacts")
		})
		.catch((error) => {
			const errorMessage = error.message;
			alert(errorMessage)
		});
	}
	return (
		<div className="px-6 text-gray-800">
			<div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between xl:justify-center">
				<div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:ml-20 xl:w-5/12">
					<form>
						<div className="mb-6">
							<input
								type="text"
								className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
								id="exampleFormControlInput2"
								placeholder="Email address"
								onChange={e=>setEmail(e.target.value)}
								value={email}
							/>
						</div>

						<div className="mb-6">
							<input
								type="password"
								className="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
								id="exampleFormControlInput2"
								placeholder="Password"
								onChange={e=>setPw(e.target.value)}
								value={pw}
							/>
						</div>

						<div className="flex text-center lg:text-left">
							<button
								type="button"
								className="mr-4 w-full rounded bg-blue-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
								onClick={()=>login()}
							>
								Login
							</button>
							<button
								type="button"
								className="inline-block w-full rounded bg-green-600 px-7 py-3 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
								onClick={()=>register()}
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AuthPage;
