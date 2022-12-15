import React, { useEffect, useState } from "react";

import { BsFillPatchPlusFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import { CSVLink, CSVDownload } from "react-csv";


import ContactCard from "../components/contact-card";
import { db } from "../firebase";
import { getFirestore } from "firebase/firestore";

function HomePage() {
	const [contactList, setContactList] = useState([]);
	const [filteredContacts, setFilteredContacts] = useState([])

	const [searchTerm, setSearchTerm] = useState("");
	const [searchType, setSearchType] = useState("email");

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const [inputErr, setInputErr] = useState();

	const [addMode, setAddMode] = useState(false);
	const [addSuccess, setAddSuccess] = useState(false);

	const [updateSwitch, setUpdateSwitch] = useState(false)


	useEffect(() => {
		async function getContacts() {
			await getDocs(collection(db, "contacts"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
				console.log(newData)
                setContactList(newData);     
				setFilteredContacts(newData)           
            })
		}
		getContacts()
	}, []);

	useEffect(()=>{
		const nf = contactList.filter(x=>{
			return x[searchType].toLowerCase().includes(searchTerm)})
		setFilteredContacts(nf)
	}, [searchTerm])

	useEffect(()=>{
		setFilteredContacts(contactList)
	}, [contactList])

	useEffect(()=>{
		async function getContacts() {
			await getDocs(collection(db, "contacts"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
				console.log(newData)
                setContactList(newData);     
				setFilteredContacts(newData)           
            })
		}
		console.log("triggered")
		getContacts()
	}, [updateSwitch])


	async function fireSubmit() {
		if (!name || !email || !phone) {
			setInputErr(true);
			return;
		}
		const docRef = await addDoc(collection(db, "contacts"), {
			name, email, phone
		  });
		setContactList([...contactList, {name, email, phone, id: docRef.id}])
		setAddMode(false);
		setAddSuccess(true);
	}

	return (
		<div className="flex flex-col p-4">
			<div className="h-18 flex items-center justify-between">
				<div className="rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 flex">
					<div className="flex h-full rounded-lg p-3">
						<select
							className="rounded-l-lg bg-gray-300 p-2 text-sm font-bold text-slate-600"
							onChange={(e) => setSearchType(e.target.value)}
						>
							<option value="email">EMAIL</option>
							<option value="name">NAME</option>
							<option value="phone">PHONE</option>
						</select>
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Enter search term..."
							className="w-full appearance-none rounded-r-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
						/>
					</div>
				<CSVLink data={contactList} filename={"contacts.csv"} className="flex font-bold items-center text-white rounded-lg bg-emerald-500 m-2 p-2 transition duration-500 ease-in-out hover:bg-emerald-800">Download CSV</CSVLink>

				</div>
				<div className="absolute right-0 top-4 mr-4 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4 transition duration-200 ease-in-out hover:cursor-pointer ">
					<div
						onClick={() => setAddMode(!addMode)}
						className="flex justify-center rounded-lg bg-teal-500 py-2 px-3 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2  focus:ring-offset-indigo-200 "
					>
						<BsFillPatchPlusFill size={24} />
						<div className="ml-2">{addMode ? "Cancel" : "Add contact"}</div>
					</div>
					{addMode ? (
						<div className="z-50 mt-2 flex flex-col justify-center p-1">
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Contact Name"
								className="mb-1 w-full appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
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
								className="mb-2 w-full appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
							/>
							{inputErr ? (
								<div className="mb-2 text-center text-sm text-white">
									All fields are mandatory
								</div>
							) : null}
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
									onClick={() => setAddMode(false)}
								>
									<AiOutlineClose size={"20"} />
								</button>
							</div>
						</div>
					) : null}
				</div>
			</div>
			<div className="mt-4 flex flex-wrap">
				{filteredContacts ? filteredContacts.map(contact => <ContactCard key={contact.id} propId={contact.id} propEmail={contact.email} propName={contact.name} propPhone={contact.phone} updateSwitch={updateSwitch} setUpdateSwitch={setUpdateSwitch}/>):null}
			</div>
		</div>
	);
}

export default HomePage;
