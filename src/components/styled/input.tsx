import styled from "styled-components";

const CmsInput = styled.input`
	width: 100%;
	height: 31px;
	border: solid 1px $secondary;
	border-radius: 3px;
	padding: 10px;
`;

const CmsTextarea = styled.textarea(CmsInput);

export {
	CmsInput,
	CmsTextarea
};
