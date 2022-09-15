import { Button, Field, FieldLabel, Notification, TextInput } from "@contentstack/venus-components";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/loginContext";
import { Slide, Bounce, Flip, Zoom, cssTransition } from "react-toastify";

const baseurl = "http://localhost:4000";

function Signup(){

	const loginContext = useContext(LoginContext);
	const { checkNotificationType,isLoggedIn, login, logout,isUsersListChanged,setusersListChanged } = loginContext;
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setfirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const navigate = useNavigate();

	

	const addUser = async () => {
		fetch(`${baseurl}/users`, {
			method: "POST",
			headers: { "Content-type": "application/json; charset=UTF-8" },
			body: JSON.stringify({ firstName:firstName,lastName:lastName,username:username ,password:password,confirmPassword:confirmPassword  }),
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log("data",data);
				showNotification({
					text: data.message,
					type: checkNotificationType(data.statusCode),
				});
				if(data.statusCode === 201){
					setUsername("");
				setConfirmPassword("")
				setPassword("")
				setfirstName("")
				setlastName("")
				setusersListChanged(isUsersListChanged+1);
				// console.log("isUsersListChanged",isUsersListChanged);
				navigate('/login')
				}
			});
	};
	const showNotification = (props) => {
		return Notification({
			notificationContent: { text: props.text },
			notificationProps: {
				hideProgressBar: true,
				position: "top-right",
				draggable: true,
				transition: Bounce,
				closeButton: true,
				autoClose: true,
			},
			type: props.type,
		});
	};

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
							navigate('/login')
						}}
					>
						{" "}
						login
					</Button>
				</div>
				<Field name="firstName" id="firstName" width="medium">
						<FieldLabel htmlFor="label">First Name</FieldLabel>
						<TextInput
							onChange={(e) => setfirstName(e.target.value)}
							value={firstName}
							name="label"
							placeholder="Enter Your First Name"
						/>
					</Field>
					<Field name="lastName" id="lastName" width="medium">
						<FieldLabel htmlFor="label">First Name</FieldLabel>
						<TextInput
							onChange={(e) => setlastName(e.target.value)}
							value={lastName}
							name="label"
							placeholder="Enter Your Last Name"
						/>
					</Field>
					
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
					<Field name="confirmPassword" id="confirmPassword" width="medium">
						<FieldLabel htmlFor="password-label">
						Confirm Password
						</FieldLabel>
						<TextInput
							onChange={(e) => setConfirmPassword(e.target.value)}
							value={confirmPassword}
							type="password"
							name="password-label"
							placeholder="Re-Enter Your Password"
						/>
					</Field>
					<br></br>
					<Button
						onClick={addUser}
						buttonType="primary"
						isFullWidth
						size="large"
					>
						{" "}
						Sign Up
						<Link to="/"></Link>
					</Button>
				</div>
			</div>
		</>
	);
}
export default Signup;