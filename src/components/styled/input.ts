import styled from "styled-components";
import { secondary } from "./colors";

const CmsInput = styled.input`
	width: 100%;
	height: 31px;
	border: solid 1px ${props => props.theme.secondary ? props.theme.secondary : secondary};
	border-radius: 3px;
	padding: 10px;
`;

const CmsTextarea = styled.textarea(CmsInput);

export {
	CmsInput,
	CmsTextarea
};
