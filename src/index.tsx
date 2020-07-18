import * as React from "react";
import { useRoutes } from "hookrouter";
import { ThemeProvider } from "styled-components";
import CmsPage from "./components/cmspage";
import UserCms from "./components/userpage";
import Gate from "./components/gate";
import { slugify } from "./util";
import { MainAppProps } from "./types";

function OpenCms({
	routes,
	theme = {},
	logo = null,
	apiAddress = "http://localhost:8080",
	components = [],
	userPage = true,
	userMap = [],
	userRoute = "/users",
	locked = true,
	credentials = { username: "admin", password: "password123" }
}: MainAppProps) {

	let remappedRoutes = {};

	for(let r in routes){
		remappedRoutes[`/admin/${slugify(routes[r].name)}`] = () => (
			<ThemeProvider theme={theme}>
				<Gate creds={credentials} locked={locked} component={() => (
					<CmsPage
						otherRoutes={routes}
						apiRoute={`${apiAddress}${routes[r].apiRoute}`}
						logo={logo}
						customComponents={components}
					/>
				)}/>
			</ThemeProvider>
		) 
	}

	if(userPage){
		remappedRoutes["/admin/users"] = () => (
			<ThemeProvider theme={theme}>
				{
					userMap && userMap.length >= 1 ?
					<Gate creds={credentials} locked={locked} component={() => (
						<UserCms
							userRoute={userRoute}
							userConfig={userMap}
							apiAddress={apiAddress}
							otherRoutes={routes}
						/>
					)} />
					:
					<Gate creds={credentials} locked={locked} component={() => (
						<UserCms apiAddress={apiAddress} otherRoutes={routes} />
					)} />
				}
			</ThemeProvider>
		)
	}

	const router = useRoutes(remappedRoutes);

	return router;
}

export default OpenCms;
