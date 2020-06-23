import * as React from "react";
import axios, { AxiosResponse, AxiosError } from "axios"
import { CmsRoute } from "../";
import { DangerButton, SuccessButton } from "./styled/button";
import { Cms, CmsHeader, CmsBody } from "./styled/cms";
import { slugify } from "../util";

interface UserInfo {
	id: number | string;
	[key: string]: any;
}

interface UserCmsProps {
	apiAddress: string;
	userRoute?: string;
	otherRoutes: [CmsRoute];
	logo?: any;
}

interface UserCmsState {
	deleteModal: boolean;
	editModal: boolean;
	users: UserInfo[]
}

export default class UserCms extends React.Component<UserCmsProps, UserCmsState> {

	state = {
		deleteModal: false,
		editModal: false,
		users: []
	};

	static defaultProps = {
		userRoute: "/users"
	}

	componentDidMount(){
		const { apiAddress, userRoute } = this.props;
		axios.get(`${apiAddress}${userRoute}`).then((resp: AxiosResponse) => {
			
		}).catch((err: AxiosError) => {
			
		})
	}

	render(){
		const { logo, otherRoutes } = this.props;
		return (
			<Cms className="cms-page">
				<CmsHeader className="cms-header" logo={logo}>
					{
						logo &&
							<div className="header-logo">
								<img src={logo} />
							</div>
					}
					{
						otherRoutes.map((r: any, i: number) => (
							<div key={i} className="route-link">
								<a href={`/admin/${slugify(r.name)}`}>
									{r.name}
								</a>
							</div>
						))
					}
				</CmsHeader>
				<br />
			</Cms>
		)
	}
}
