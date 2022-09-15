import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import TodoApp from "../components/TodoApp/TodoApp";
import { LoginContext } from "../context/loginContext";
import ProtectedRoutes from "./ProtectedRoutes";

function AppRouter(){
	const {isLoggedIn} = useContext(LoginContext);
	console.log("isLoggedIn",isLoggedIn);
	// const navigate = useNavigate()
	return (
		<BrowserRouter>
			<Routes>
				{/* <Route path='/' element={<ProtectedRoutes><TodoApp /></ProtectedRoutes>}></Route> */}
				<Route path='/' element={<TodoApp />}></Route>
				<Route path='/todoApp' element={<ProtectedRoutes><TodoApp /></ProtectedRoutes>}></Route>
				{/* <Route path='/login' element={<Login />}></Route> */}
				<Route path='/login' element={isLoggedIn==="true" ? <TodoApp /> : <Login />}></Route>
				<Route path='/signup' element={<Signup />}></Route>
			</Routes>
		</BrowserRouter>
	);

}
export default AppRouter;