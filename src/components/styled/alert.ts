import styled from "styled-components";
import { danger, success } from "./colors";

const Alert = styled.div`
	display: flex;
	flex-direction: column;
	padding: 26px;
	margin: 0 5px 10px 5px;
	color: white;
`;

const DangerAlert = styled(Alert)`
	background-color: ${props => props.theme.danger ? props.theme.danger : danger};
	border: solid 1px ${props => props.theme.danger ? props.theme.danger : danger};
`;

const SuccessAlert = styled(Alert)`
	background-color: ${props => props.theme.success ? props.theme.success : success};
	border: solid 1px ${props => props.theme.success ? props.theme.success : success};
`;

export {
	DangerAlert,
	SuccessAlert
}
