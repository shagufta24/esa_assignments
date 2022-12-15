import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { AiFillDelete, AiOutlineClose } from "react-icons/ai";

import UserImg from "../assets/user.png";
import { db } from "../firebase";

function ContactCard({ propName, propEmail, propPhone, propId, setUpdateSwitch, updateSwitch }) {
	const [editMode, setEditMode] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	useEffect(() => {
		setName(propName);
		setEmail(propEmail);
		setPhone(propPhone);
	}, []);

	async function fireSubmit() {
		const contactRef = doc(db, "contacts", propId);

		await updateDoc(contactRef, {
			name, email, phone
		});

        setUpdateSwitch(!updateSwitch)

		setEditMode(false);
	}

    async function fireDelete() {
        const contactRef = doc(db, "contacts", propId)

        await deleteDoc(contactRef)
        setUpdateSwitch(!updateSwitch)
    }

	return (
		<div
			className="mr-3 flex flex-col rounded-lg bg-white p-4 shadow-lg"
			style={{ height: "250px", width: "350px" }}
		>
			<div className="mb-1 flex w-full justify-end">
				<AiFillDelete
					size={"20"}
					className="text-rose-500 transition duration-200 ease-in-out hover:cursor-pointer hover:text-rose-900"
                    onClick={fireDelete}
				/>
			</div>
			<div className="flex h-full">
				<div
					style={{
						backgroundImage: `url(${UserImg})`,
						height: "100%",
						width: "100px",
					}}
					className="mr-4 bg-contain bg-center bg-no-repeat"
				/>
				<div className="flex flex-col justify-center border-l-2 border-indigo-100 p-1 pl-4">
					{editMode ? (
						<>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Contact Name"
								className="mb-2 w-full appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
							/>
							<input
								type="text"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder="Phone #"
								className="mb-1 w-full appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
							/>
							<input
								type="text"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email"
								className="mb-4 w-full appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
							/>
							<div className="flex w-full">
								<button
									type="button"
									className="mr-2 w-full flex-1 rounded-lg bg-teal-500 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
									onClick={fireSubmit}
								>
									Submit
								</button>
								<button
									type="button"
									className="rounded-lg bg-rose-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
									onClick={() => setEditMode(false)}
								>
									<AiOutlineClose size={"20"} />
								</button>
							</div>
						</>
					) : (
						<>
							<div className="mb-3 text-xl font-bold text-slate-700">
								{propName}
							</div>
							<div className="mb-1 text-sm text-gray-500">{propPhone}</div>
							<div className="mb-4 text-sm text-gray-500">{propEmail}</div>

							<button
								type="button"
								className="w-full rounded-lg bg-indigo-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
								onClick={() => setEditMode(true)}
							>
								Edit
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default ContactCard;
