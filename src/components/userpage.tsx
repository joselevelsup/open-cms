import * as React from "react";
import axios, { AxiosResponse, AxiosError } from "axios"
import { Cms, CmsHeader, CmsBody } from "./styled/cms";
import { DangerAlert, SuccessAlert } from "./styled/alert";
import { DangerButton, SuccessButton } from "./styled/button";
import { slugify } from "../util";
import { UserInfo, UserCmsProps, UserCmsState } from "../types";
const { useState, useEffect } = React;

const UserCms = (props: UserCmsProps) => {

	const { apiRoute, passwordResetRoute, userConfig, logo, otherRoutes } = props;

	const [ users, setUsers ] = useState<[any]>([]);
	const [ errorMessage, setErrorMessage ] = useState<any>(null);
	const [ successMessage, setSuccessMessage ] = useState<any>(null);

	const retreiveUsers = () => {
		const currentApiRoute: string = typeof apiRoute == "string" ? apiRoute : apiRoute.get;
		axios.get(currentApiRoute).then(({ data }: AxiosResponse) => {
			if(data && data.length >= 1){
				setUsers(data);
			}
		}).catch(({ message }: AxiosError) => {
			setErrorMessage(`Error loading Users from ${currentApiRoute} (${message})`);
		})
	}

	useEffect(() => {
		retreiveUsers();
	}, [])


	const deleteUser = (id: string | number) => {
		const currentApiRoute: string = typeof apiRoute == "string" ? apiRoute : apiRoute.delete;
		let confirmDeleteUser = confirm("Are you sure you want to delete this user?");

		if(confirmDeleteUser){
			axios.delete(`${currentApiRoute}/${id}`).then(({ status }: AxiosResponse) => {
				if(status == 200){
					setSuccessMessage("Successfully deleted User!")
					retreiveUsers();
				}
			}).catch(({ message }: AxiosError) => {
				setErrorMessage(`Error loading Users from ${currentApiRoute} (${message})`);
			})
		}
	}

	const sendResetPassword = (id: string | number) => {
		const currentApiRoute: string = typeof apiRoute == "string" ? apiRoute : apiRoute.put;
		let confirmResetUserPass = confirm("Reset this User's password?");

		if(confirmResetUserPass){
			let resetPasswordPrompt = prompt("Enter new password (Leave empty if sending instructions)", "");
			if(resetPasswordPrompt !== null){
				const apiData: { newPassword: string | null } = {
					newPassword: resetPasswordPrompt.length >= 1 ? resetPasswordPrompt : null
				};

				axios.put(`${currentApiRoute}/${id}/${passwordResetRoute}`, {
					data: apiData
				}).then(({ status, data }: AxiosResponse) => {
					if(status == 200){
						setSuccessMessage(data.message)
					}
				}).catch(({ message }: AxiosError) => {
					setErrorMessage(`Error (${message})`)
				});
			}
		}
	}

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
			{
				successMessage &&
					<SuccessAlert>
						{successMessage}
					</SuccessAlert>
			}
			<CmsBody className="cms-body">
				<div className="user-table-content">
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
											<SuccessButton onClick={() => sendResetPassword(u.id)}>Reset Password</SuccessButton>
											{" "}
											<DangerButton onClick={() => deleteUser(u.id)}>Delete User</DangerButton>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</CmsBody>
		</Cms>
	)
}

UserCms.defaultProps = {
	apiRoute: "/cms/users",
	passwordResetRoute: "/reset/password",
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
	],
	logo: null,
	otherRoutes: []
}

export default UserCms;
