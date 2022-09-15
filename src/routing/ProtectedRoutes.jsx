import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/loginContext";

function ProtectedRoutes({ children }) {
	const navigate = useNavigate();
	const { isLoggedIn } = useContext(LoginContext);
	console.log("isLoggedIn--proected",isLoggedIn);
	useEffect(() => {
		if(isLoggedIn === "false") {
			navigate("/login");
		}
	},[]);
	return <>{children}</>;
}

export default ProtectedRoutes;
