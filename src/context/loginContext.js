import { createContext, useState } from "react";
import { cbModal, Notification } from "@contentstack/venus-components";
import { Slide, Bounce, Flip, Zoom, cssTransition } from "react-toastify";
import SigninFailedModal from "../components/Modal/SigninFailedModal";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();


function LoginProvider({children}){
	const localLoginStatus = localStorage.getItem('loginStatus');
	const localUser = localStorage.getItem('user');
	const [isLoggedIn, setIsLoggedIn] = useState(localLoginStatus);
	const [isUsersListChanged, setusersListChanged] = useState(0);
	const [activeUser , setActiveUser] = useState(localUser)
	// localStorage.setItem('loginStatus', 'false');
	
	const logout = () =>{
		// console.log("localLoginStatus",localLoginStatus);
		// console.log("localUser",localUser);
		
		Notification({
			notificationContent: { text: "Here from Login Context -- User Logged Out" },
			notificationProps: {
				hideProgressBar: true,
				position: "top-right",
				draggable: true,
				transition: Bounce,
				closeButton: true,
				autoClose: true,
			},
			type: "success",
		});
		setIsLoggedIn(false)
		localStorage.setItem('loginStatus', false);
		// console.log("isLoggedIn",isLoggedIn);
		setActiveUser()
		localStorage.setItem('user', ' ');
	}

	const checkNotificationType = (statusCode) => {
		let type = "warning";
		switch (statusCode) {
			case 200:
				type = "message";
				break;
				case 201:
					type = "success";
					break;
					case 400:
						type = "error";
						break;
						case 422:
							type = "warning";
							break;
			case 500:
				type = "warning";
				break;
			}
		return type;
	};
	
	// const login = (user) =>{
	// 	// console.log("localLoginStatus",localLoginStatus);
	// 	// const navigate = useNavigate();
	// 	// Notification({
	// 	// 	notificationContent: { text: "Here from Login Context -- Logged In Successfully" },
	// 	// 	notificationProps: {
	// 	// 		hideProgressBar: true,
	// 	// 		position: "top-right",
	// 	// 		draggable: true,
	// 	// 		transition: Bounce,
	// 	// 		closeButton: true,
	// 	// 		autoClose: true,
	// 	// 	},
	// 	// 	type: "success",
	// 	// });
	// 	// setActiveUser(user)
	// 	// localStorage.setItem('user', user.firstName);
	// 	// localStorage.setItem('loginStatus', true);
	// 	// setIsLoggedIn(localStorage.getItem("loginStatus"))
	// 	navigate('/todoApp')
	// 	// console.log(isLoggedIn);
	// }
	return <LoginContext.Provider value={{checkNotificationType,isLoggedIn,setIsLoggedIn  , logout,activeUser,setActiveUser,isUsersListChanged, setusersListChanged}}>
		{children}
	</LoginContext.Provider>
}

export default LoginProvider