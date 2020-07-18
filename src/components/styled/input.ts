import styled from "styled-components";
import { secondary } from "./colors";

const CmsInput = styled.input`
	width: 100%;
	height: 31px;
	border: solid 1px ${props => props.theme.secondary ? props.theme.secondary : secondary};
	border-radius: 3px;
	padding: 10px;
	outline: none;
`;

const CmsInputHeader = styled(CmsInput)`
	width: 30%;
	margin-top: auto;
`

const CmsTextarea = styled.textarea`
	width: 100%;
	border: solid 1px ${props => props.theme.secondary ? props.theme.secondary : secondary};
	border-radius: 3px;
	padding: 10px;
	outline: none;
`;

const CmsFileUpload = styled.div`
	border: solid 1px ${props => props.theme.secondary ? props.theme.secondary : secondary};
	background-color: ${props => props.theme.secondary ? props.theme.secondary : secondary};
	border-radius: 3px;
	width: 30%;
	& > div {
		color: #ffffff;
	}
`

export {
	CmsInput,
	CmsTextarea,
	CmsInputHeader,
	CmsFileUpload
};
