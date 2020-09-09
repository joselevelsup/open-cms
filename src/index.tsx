import * as React from "react";
import { useRoutes } from "hookrouter";
import { ThemeProvider } from "styled-components";
import CmsPage from "./components/cmspage";
import UserCms from "./components/userpage";
import { slugify } from "./util";
import { MainAppProps } from "./types";
import SimpleGate from "react-gate-duo";

function OpenCms({
	routes,
	theme = {},
	logo = null,
	apiAddress = "",
	components = [],
	locked = true,
	userCmsProps = { access: false },
	gateProps = { localCredentials: { username: "admin", password: "password" } }
}: MainAppProps) {

	let remappedRoutes = {};

	for(let r in routes){
		const cmsProps = {
			otherRoutes: routes,
			apiRoute: `${apiAddress}${routes[r].apiRoute}`,
			logo,
			customComponents: components
		};

		remappedRoutes[`/admin/${slugify(routes[r].name)}`] = () => (
			<ThemeProvider theme={theme}>
				{
					locked ?
					<SimpleGate {...gateProps}>
						<CmsPage {...cmsProps} />
					</SimpleGate>
					:
					<CmsPage {...cmsProps}/>
				}
			</ThemeProvider>
		) 
	}

	if(userCmsProps.access){
		const userProps = {
			...userCmsProps,
			apiRoute: userCmsProps.userRoute && `${apiAddress}${userCmsProps.userRoute}`,
			otherRoutes: routes
		};

		remappedRoutes["/admin/users"] = () => (
			<ThemeProvider theme={theme}>
				<>
					{
						locked ?
						<SimpleGate {...gateProps}>
							<UserCms {...userProps}/>
						</SimpleGate> 
						:
						<UserCms {...userProps}/>
					}
				</>
			</ThemeProvider>
		)
	}

	const router = useRoutes(remappedRoutes);

	return router;
}

export default OpenCms;
