import styled, { css } from "styled-components";
import { pageColor, headerColor } from "./colors";

const Cms = styled.div`
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.pageColor ? props.theme.pageColor : pageColor};
`;

const CmsHeader = styled.div.attrs((props: { logo: string }) => ({
	logo: props.logo ? true : false
}))`
	display: flex;
	flex-direction: row;
	flex: 1;
	background-color: ${props => props.theme.headerColor ? props.theme.headerColor : headerColor};
	${props => props.logo ? 
		css`
			padding: 6px 0;
		` 
		: 
		css`
			padding: 25px 10px;
		`
	}
`;

const CmsBody = styled.div`
	display: flex;
	flex-direction: row;
	padding: 10px 5px 0px 5px;
	background-color: ${props => props.theme.pageColor ? props.theme.pageColor : pageColor};
`;

export {
	Cms,
	CmsHeader,
	CmsBody
};
