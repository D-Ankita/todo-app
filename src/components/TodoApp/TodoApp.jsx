import { useContext, useEffect, useRef, useState } from "react";
import Tasklist from "../Tasklist/Tasklist";

import "./TodoApp.css";
import "@contentstack/venus-components/build/main.css";
import {
	Button,
	Icon,
	TextInput,
	Notification,
	Heading,
	ButtonGroup,
	cbModal,
	Dropdown,
	Field,
	FieldLabel,
	Link,
} from "@contentstack/venus-components";
import { Slide, Bounce, Flip, Zoom, cssTransition } from "react-toastify";
import { Pagination } from "@mui/material";
import DeleteModal from "../Modal/DeleteModal";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";

const baseurl = "http://localhost:4000";

function TodoApp() {
	const loginContext = useContext(LoginContext);
	const navigate = useNavigate();
	const { logout, activeUser, isLoggedIn } = loginContext;

	const [inputTask, setInputTask] = useState("");
	const [taskList, setTaskList] = useState([]);
	const [isTaskListChanged, setisTaskListChanged] = useState(false);
	const [pageNo, setPageNo] = useState(1);
	const [limit, setlimit] = useState(3);
	const [totalPages, settotalPages] = useState();
	const [query, setQuery] = useState(
		`${baseurl}/todos?page=${pageNo}&limit=${limit}`
	);
	// console.log("activeUser--todo--local", activeUser);
	// console.log(activeUser);
	console.log("isLoggedIn--todo--local", isLoggedIn);
	// if(isLoggedIn==="true"){
	// 	navigate("/todoApp")
	// }
	useEffect(() => {
		fetchTask();
	}, [isTaskListChanged,pageNo,totalPages,limit]);
	// useEffect(() => {
	// 	fetchTask();
	// }, [isTaskListChanged]);
	// useEffect(() => {
	// 	fetchTask();
	// }, [pageNo]);
	// useEffect(() => {
	// 	fetchTask();
	// }, [totalPages]);
	// useEffect(() => {
	// 	fetchTask();
	// }, [limit]);

	const fetchTask = () => {
		fetch(`${baseurl}/todos?page=${pageNo}&limit=${limit}`)
			.then((response) => response.json())
			.then((responseData) => {
				setTaskList([...responseData.data]);
				settotalPages(responseData.totalPages);
			});
	};

	const updateTodo = (id, description) => {
		const taskListCopy = [...taskList];
		let task = taskListCopy.find((task) => task.id === id);
		task.description = description;
		setTaskList([...taskListCopy]);
		fetch(`${baseurl}/todos/${id}`, {
			method: "PATCH",
			headers: { "Content-type": "application/json; charset=UTF-8" },
			body: JSON.stringify({ description: description }),
		})
			.then((response) => response.json())
			.then((data) => {
				showNotification({
					text: data.message,
					type: checkNotificationType(data.statusCode),
				});
				// console.log("DATA", data);
			});
	};

	const updateStatus = (id, checked) => {
		const taskListCopy = [...taskList];
		let task = taskListCopy.find((task) => task.id === id);
		task.isComplete = checked;
		setTaskList([...taskListCopy]);
		fetch(`${baseurl}/todos/${id}`, {
			method: "PATCH",
			headers: { "Content-type": "application/json; charset=UTF-8" },
			body: JSON.stringify({ isComplete: checked }),
		})
			.then((response) => response.json())
			.then((data) => {
				showNotification({
					text: data.message,
					type: checkNotificationType(data.statusCode),
				});
				// console.log("DATA after status change", data);
			});
	};

	const deleteTodo = (id) => {
		let taskListCopy = [...taskList];
		taskListCopy = taskListCopy.filter((task) => task.id !== id);
		setTaskList([...taskListCopy]);
		setisTaskListChanged(!isTaskListChanged);
		fetch(`${baseurl}/todos/${id}`, {
			method: "DELETE",
			headers: { "Content-type": "application/json; charset=UTF-8" },
		})
			.then((response) => response.json())
			.then((data) => {
				showNotification({
					text: data.message,
					type: checkNotificationType(data.statusCode),
				});
			});
	};

	const addTodo = async () => {
		fetch(`${baseurl}/todos`, {
			method: "POST",
			headers: { "Content-type": "application/json; charset=UTF-8" },
			body: JSON.stringify({ description: inputTask }),
		})
			.then((response) => response.json())
			.then((data) => {
				showNotification({
					text: data.message,
					type: checkNotificationType(data.statusCode),
				});
				setInputTask("");
				setisTaskListChanged(!isTaskListChanged);
			});
	};

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

	const handelPageChange = (event, value) => {
		setPageNo(value);
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
	console.log("reached here");
	return(<>
	{console.log("inside return")}
			<div className="avatar">
				<Icon
					className="avatarIcon"
					hover
					hoverType="secondary"
					icon="Profile"
					// shadow="medium"
					size="large"
				/>
				<br></br>
				<br></br>
				<br></br>

				<Link
					fontColor="base"
					fontSize="large"
					fontWeight="regular"
					href={undefined}
					iconName="NewTab"
					target="_blank"
					testId="cs-link"
					type="external"
					underLineType="dashed"
					underline="true"
				>
					{activeUser}
				</Link>
			</div>
			<div id="mybutton">
				<Button
					className="signup"
					buttonType="primary"
					isFullWidth
					size="small"
					onClick={() => {
						logout();
						navigate("/login");
					}}
				>
					{" "}
					Logout
				</Button>
			</div>
			<Heading tagName="h1" text="To-Do List" className="App-heading" />
			<div className="App-todoComponent">
				<ButtonGroup className="App-inputComponent">
					<TextInput
						width="large"
						name="label"
						onChange={(e) => setInputTask(e.target.value)}
						value={inputTask}
						placeholder="Enter Task"
					/>
					<Button
						buttonType="primary"
						type="submit"
						iconAlignment={undefined}
						onClick={addTodo}
					>
						<Icon icon="AddPlus" />
						Add
					</Button>
				</ButtonGroup>
				<div className="App-taskList">
					<Tasklist
						todos={taskList}
						updateStatus={updateStatus}
						updateTodo={updateTodo}
						addTodo={addTodo}
						deleteTodo={deleteTodo}
					/>
					<div className="App-pagination">
						<Pagination
							count={totalPages}
							page={pageNo}
							siblingCount={0}
							onChange={handelPageChange}
							sx={{ margin: " 20px auto auto auto" }}
						/>
						<Field style={{ width: "100px" }}>
							<FieldLabel htmlFor="label" style={{}}>
								Custom Limit
							</FieldLabel>
							<TextInput
								value={limit}
								style={{ width: "20px" }}
								onChange={(e) => setlimit(e.target.value)}
							/>
						</Field>
						<Dropdown
							closeAfterSelect="false"
							dropDownPosition="top"
							dropDownType="primary"
							highlightActive={true}
							isEllipse={true}
							isMultiCheck={false}
							list={[
								{
									default: true,
									label: "3",
									value: "3",
									action: (e) => {
										setlimit(3);
									},
								},
								{
									label: "5",
									value: "5",
									action: (e) => {
										setlimit(5);
									},
								},
								{
									label: "7",
									value: "7",
									action: (e) => {
										setlimit(7);
									},
								},
								{
									label: "10",
									value: "10",
									action: (e) => {
										setlimit(10);
									},
								},
								{
									label: "25",
									value: "25",
									action: (e) => {
										setlimit(25);
									},
								},
								{
									label: "50",
									value: "50",
									action: (e) => {
										setlimit(50);
									},
								},
								{
									label: "100",
									value: "100",
									action: (e) => {
										setlimit(100);
									},
								},
							]}
							onChange={(e) => setlimit(e.target.label)}
							testId="cs-dropdown"
							type="select"
							viewAs="value"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default TodoApp;
