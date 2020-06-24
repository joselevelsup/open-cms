import * as React from "react";
import axios, { AxiosResponse, AxiosError } from "axios"
import { CmsRoute } from "../";
import { DangerButton, SuccessButton } from "./styled/button";
import { Cms, CmsHeader, CmsBody } from "./styled/cms";
import { DangerAlert } from "./styled/alert";
import { slugify } from "../util";

interface UserInfo {
	id: string | number;
	[key: string]: any
}

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
	users: UserInfo[];
	errorMessage: string | null;
	successMessage: string | null;
}

export default class UserCms extends React.Component<UserCmsProps, UserCmsState> {

	state = {
		deleteModal: false,
		editModal: false,
		users: [
			{
				id: 1,
				firstName: "jack",
				lastName: "dorsey",
				email: "jdorsey@mail.com",
			}
		],
		errorMessage: null,
		successMessage: null
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
			}
		]
	}

	retreiveUsers = () => {
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
				errorMessage: `Error loading Users from ${apiAddress}${userRoute} (${err.message})`
			});
		})
	}

	componentDidMount(){
		/* this.retreiveUsers(); */
	}

	toggleDeleteUserModal = () => this.setState(state => ({
		deleteModal: !state.deleteModal
	}));

	deleteUser = (id: string | number) => {
		const { apiAddress, userRoute } = this.props;
		const self = this;
		let confirmDeleteUser = confirm("Are you sure you want to delete this user?");
		if(confirmDeleteUser){
			axios.delete(`${apiAddress}${userRoute}`, {
				data: {
					userId: id
				}
			}).then((resp: AxiosResponse) => {
				if(resp.status == 200){
					self.setState({
						successMessage: "Successfully deleted User!"
					});
				}
			}).catch((err: AxiosError) => {
				self.setState({
					errorMessage: `Error loading Users from ${apiAddress}${userRoute} (${err.message})`
				});
			})
		}
	}

	render(){
		const { logo, otherRoutes, userConfig } = this.props;
		const { users, errorMessage } = this.state;
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
					errorMessage &&
						<DangerAlert>
							{errorMessage}
						</DangerAlert>
				}
				<CmsBody className="cms-body">
					<table className="user-table">
						<thead>
							<tr>
								<th>ID</th>
								{
									userConfig.map((uc: { name: string, key: string }) => (
										<th>{uc.name}</th>
									))
								}
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								users && users.map((u: UserInfo) => (
									<tr>
										<td>{u.id}</td>
										{
											userConfig.map((uc: { name: string, key: string }) => (
												<td>{u[uc.key]}</td>
											))
										}
										<td className="user-options">
											<SuccessButton>Reset Password</SuccessButton>
											{" "}
											<DangerButton onClick={() => this.deleteUser(u.id)}>Delete User</DangerButton>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</CmsBody>
			</Cms>
		)
	}
};
