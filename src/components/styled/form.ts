import styled from "styled-components";

const CmsForm = styled.div`
	margin: 20%;
	padding: 10px;
	& > form {
		padding: 5% 10px;
		border-radius: 2px;
		border: solid 2px black;
		& > div {
			margin-bottom: 5px;
			&:last-child {
				display: flex;
				justify-content: center;
			}
		}
	}
`;

export {
	CmsForm
}
