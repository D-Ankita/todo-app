import { Button, ButtonGroup, Icon, ModalBody, ModalFooter, ModalHeader } from "@contentstack/venus-components";

const SigninFailedModal = (props) => {  
	// console.log("header:",props.header);
	return (
		<>
			<ModalBody className="modalBodyCustomClass">
				<h2><Icon icon="RedAlert" size="large"/> {props.header}</h2><br />
			</ModalBody>

			<ModalFooter>
				<ButtonGroup>
					<Button
						buttonType="light"
						onClick={() => props.closeModal("false")}
					> 
					Try Again
					</Button>
					<Button buttonType="light"
						onClick={() =>props.closeModal("true")} >
							Signup instead
					</Button>
				</ButtonGroup>
			</ModalFooter>
		</>
	);
};

export default SigninFailedModal