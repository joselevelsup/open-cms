import * as React from "react";
import { useRoutes } from "hookrouter";
import { ThemeProvider } from "styled-components";
import CmsPage from "./components/cmspage";
import UserCms from "./components/userpage";
import Gate from "./components/gate";
import { slugify } from "./util";

export type CmsRoute = {
	name: string,
	apiRoute: string,
}

interface MainAppProps {
	apiAddress?: string;
	routes: [CmsRoute];
	theme?: any; //TODO: be specific on what the user can customize
	logo?: any;
	components?: { name: string, slug: string, component: React.ComponentType }[];
	userPage: boolean;
	userMap?: { name: string, key: string }[];
	userRoute?: string;
	locked?: boolean;
}

function OpenCms({
	routes = [{ name: "home page", apiRoute: "/home" }],
	theme = {},
	logo = null,
	apiAddress = "http://localhost:8080",
	components = [],
	userPage = true,
	userMap = [],
	userRoute = "/users",
	locked = true
}: MainAppProps) {

	let remappedRoutes = {};

	for(let r in routes){
		remappedRoutes[`/admin/${slugify(routes[r].name)}`] = () => (
			<ThemeProvider theme={theme}>
				<Gate locked={locked} component={
					<CmsPage
						otherRoutes={routes}
						apiRoute={`${apiAddress}${routes[r].apiRoute}`}
						logo={logo}
						customComponents={components}
					/>
				}/>
			</ThemeProvider>
		) 
	}

	if(userPage){
		remappedRoutes["/admin/users"] = () => (
			<ThemeProvider theme={theme}>
				{
					userMap && userMap.length >= 1 ?
						<UserCms userRoute={userRoute} userConfig={userMap} apiAddress={apiAddress} otherRoutes={routes} />		
						:
						<UserCms apiAddress={apiAddress} otherRoutes={routes} />
				}
			</ThemeProvider>
		)
	}

	const router = useRoutes(remappedRoutes);

	return router;
}

export default OpenCms;
