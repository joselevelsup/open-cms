import * as React from "react";
import axios, { AxiosResponse, AxiosError } from "axios"
import { CmsRoute } from "../";
import { DangerButton, SuccessButton } from "./styled/button";
import { Cms, CmsHeader, CmsBody } from "./styled/cms";
import { DangerAlert } from "./styled/alert";
import { slugify } from "../util";

interface UserCmsProps {
	apiAddress: string;
	userRoute?: string;
	otherRoutes: [CmsRoute];
	logo?: any;
	userConfig?: { name: string, key: string }[];
}

interface UserCmsState {
	deleteModal: boolean;
	editModal: boolean;
	users: any[];
	loadErrorMessage: string | null;
}

export default class UserCms extends React.Component<UserCmsProps, UserCmsState> {

	state = {
		deleteModal: false,
		editModal: false,
		users: [],
		loadErrorMessage: null
	};

	static defaultProps = {
		userRoute: "/users",
		userConfig: [
			{
				name: "First Name",
				key: "firstName"
			},
			{
				name: "Last Name",
				key: "lastName"
			},
			{
				name: "Email",
				key: "email"
			},
			{
				name: "Password",
				key: "password"
			}
		]
	}

	componentDidMount(){
		const { apiAddress, userRoute } = this.props;
		const self = this;
		axios.get(`${apiAddress}${userRoute}`).then((resp: AxiosResponse) => {
			const { data } = resp;

			if(data.users && data.users.length >= 1){
				self.setState({
					users: data.users
				});
			}
		}).catch((err: AxiosError) => {
			self.setState({
				loadErrorMessage: `Error loading Users from ${apiAddress}${userRoute} (${err.message})`
			});
		})
	}

	toggleDeleteUserModal = () => this.setState(state => ({
		deleteModal: !state.deleteModal
	}));

	deleteUser = (id: string | number) => {
		const { apiAddress, userRoute } = this.props;
		axios.delete(`${apiAddress}${userRoute}`, {
			data: {
				userId: id
			}
		}).then((resp: AxiosResponse) => {
			
		}).catch((err: AxiosError) => {

		})
	}

	render(){
		const { logo, otherRoutes, userConfig } = this.props;
		const { users, loadErrorMessage } = this.state;
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
				{
					loadErrorMessage &&
						<DangerAlert>
							{loadErrorMessage}
						</DangerAlert>
				}
				<CmsBody className="cms-body">
					<table className="user-table">
						<tr>
							{
								userConfig.map((uc: { name: string, key: string }) => (
									<th>{uc.name}</th>
								))
							}
						</tr>
						{
							users && users.map((u: any) => (
								<tr>
									{
										userConfig.map((uc: { name: string, key: string }) => (
											<td>{u[uc.key]}</td>
										))
									}
									<td className="user-options">
										<SuccessButton>Reset Password</SuccessButton>
										{" "}
										<DangerButton onClick={() => this.toggleDeleteUserModal}>Delete User</DangerButton>
									</td>
								</tr>
							))
						}
					</table>
				</CmsBody>
			</Cms>
		)
	}
};
