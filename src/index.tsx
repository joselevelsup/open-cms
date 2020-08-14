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
	userPage = true,
	userMap = [],
	userRoute = "/users",
	locked = true,
	gateProps = { localCredentials: { username: "admin", password: "password" } }
}: MainAppProps) {

	let remappedRoutes = {};

	for(let r in routes){
		remappedRoutes[`/admin/${slugify(routes[r].name)}`] = () => (
			<ThemeProvider theme={theme}>
				{
					locked ?
					<SimpleGate {...gateProps}>
						<CmsPage
							otherRoutes={routes}
							apiRoute={`${apiAddress}${routes[r].apiRoute}`}
							logo={logo}
							customComponents={components}
						/>
					</SimpleGate>
					:
					<CmsPage
						otherRoutes={routes}
						apiRoute={`${apiAddress}${routes[r].apiRoute}`}
						logo={logo}
						customComponents={components}
					/>
				}
			</ThemeProvider>
		) 
	}

	if(userPage){
		remappedRoutes["/admin/users"] = () => (
			<ThemeProvider theme={theme}>
				{
					userMap && userMap.length >= 1 ?
					<>
						{
							locked ?
							<SimpleGate {...gateProps}>
								<UserCms
									userRoute={userRoute}
									userConfig={userMap}
									apiAddress={apiAddress}
									otherRoutes={routes}
								/>
							</SimpleGate>
							:
							<UserCms
								userRoute={userRoute}
								userConfig={userMap}
								apiAddress={apiAddress}
								otherRoutes={routes}
							/>
						}
					</>
					:
					<>
						{
							locked ?
							<SimpleGate {...gateProps}>
								<UserCms apiAddress={apiAddress} otherRoutes={routes} />
							</SimpleGate> 
							:
							<UserCms apiAddress={apiAddress} otherRoutes={routes} />
						}
					</>
				}
			</ThemeProvider>
		)
	}

	const router = useRoutes(remappedRoutes);

	return router;
}

export default OpenCms;
