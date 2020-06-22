import styled from "styled-components";

const danger = "#f6511dff";
const success = "#7fb800ff";
const warning = "#ffb400ff";

const Button = styled.button`
	color: white;
	padding: 10px 17px;
	cursor: pointer;
`;

const DangerButton = styled(Button)`
	border: solid 2px ${props => props.theme.danger ? props.theme.danger : danger};
	background-color: ${props => props.theme.danger ? props.theme.danger : danger};
`;

const SuccessButton = styled(Button).attrs((props: { updateAlert: boolean }) => ({
	updateAlert: props.updateAlert
}))`
	border: solid 2px ${props => props.theme.success ? props.theme.success : success};
	background-color: ${props => props.theme.success ? props.theme.success : success};
`;

const WarningButton = styled(Button)`
	border: solid 2px ${props => props.theme.warning ? props.theme.warning : warning};
	background-color: ${props => props.theme.warning ? props.theme.warning : warning};
`;

export {
	DangerButton,
	SuccessButton,
	WarningButton
}
