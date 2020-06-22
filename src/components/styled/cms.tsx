import styled from "styled-components";

const pageColor = "#d4e4ff";

const Cms = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.pageColor ? props.theme.pageColor : pageColor}
`;

export default Cms;
