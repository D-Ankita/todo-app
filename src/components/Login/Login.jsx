import "./Login.css";
import {
	Button,
	cbModal,
	Field,
	FieldLabel,
	TextInput,
} from "@contentstack/venus-components";
import { LoginContext } from "../../context/loginContext";
import { useContext, useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { Notification } from "@contentstack/venus-components";
import { Slide, Bounce, Flip, Zoom, cssTransition } from "react-toastify";
import SigninFailedModal from "../Modal/SigninFailedModal";

const baseurl = "http://localhost:4000";

function Login() {
	const navigate = useNavigate();
	const loginContext = useContext(LoginContext);
	const { isLoggedIn,setIsLoggedIn,setActiveUser, logout,usersListChanged,setusersListChanged ,activeUser} = loginContext;
	const [allUsers, setAllUsers] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// const[flag,setFlag] = useState(0)

	
	useEffect(() => {
		fetchAllUsers();
	}, [usersListChanged,]);
	// useEffect(()=>{
	// 	if(flag){
	// 		navigate("/todoApp")
	// 	}
	// },[])

	const fetchAllUsers = async () => {
		// console.log(`${baseurl}/users/${username}`);
		let userDetails = await fetch(`${baseurl}/users/${username}`).then((response)=>response.json()).then((data)=> { return data.data})
		// console.log("userDetails",userDetails);
		setAllUsers([...userDetails])
	};

	const validateUser = async()=>{
		let user = allUsers.find((user) => user.username === username && user.password === password);
		if(user){
		Notification({
			notificationContent: { text: "Here from Login Context -- Logged In Successfully" },
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
		setActiveUser(user)
		localStorage.setItem('user', user.firstName);
		localStorage.setItem('loginStatus', "true");
		setIsLoggedIn(localStorage.getItem("loginStatus"))
		// setFlag(1)
		navigate('/todoApp')
			// console.log("isLoggedIn",isLoggedIn);
			// console.log("activeUser",activeUser);
		}
		else{
			signupModal()
			Notification({
				notificationContent: { text: "Login Failed"  },
				notificationProps: {
					hideProgressBar: true,
					position: "top-right",
					draggable: true,
					transition: Bounce,
					closeButton: true,
					autoClose: true,
				},
				type: "error",
			});
		}
	}
	
	
	const signupModal = () => {
		cbModal({
		  component: ({...props}) => <SigninFailedModal 
		  header={"Login Failed"}
		  {...props} />,
		  modalProps: {
		    onClose:(status)=>{
			if(status==="true"){
				navigate('/signup')
			}
		    },
		    onOpen: () => {
			// console.log('after signin failed -- gets called')
		    },
		     size: 'tiny',
		  },
		  testId: 'cs-modal-storybook',
		})
	}

	return (
		<>
			<div className="LoginPage">
				<div>
				<div id="mybutton">
				<Button	className="signup"
						buttonType="primary"
						isFullWidth
						size="small"
						onClick={()=>{
							navigate('/signup')
						}}
					>
						{" "}
						Sign-up
					</Button>
				</div>

					<Field name="username" id="username" width="medium">
						<FieldLabel htmlFor="label">Username</FieldLabel>
						<TextInput
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							name="label"
							placeholder="Enter Your Username"
						/>
					</Field>
					<Field name="password" id="password" width="medium">
						<FieldLabel htmlFor="password-label">
							Password
						</FieldLabel>
						<TextInput
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							type="password"
							name="password-label"
							placeholder="Enter Your Password"
						/>
					</Field>
					<br></br>
					<Button
						onClick={validateUser}
						buttonType="primary"
						isFullWidth
						size="large"
					>
						{" "}
						Login
						<Link to="/"></Link>
					</Button>
				</div>
			</div>
		</>
	);
}
export default Login;
