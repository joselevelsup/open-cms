import * as React from "react";
import { useRoutes } from "hookrouter";
import { ThemeProvider } from "styled-components";
import CmsPage from "./components/cmspage";
import { slugify } from "./util";

export type CmsRoute = {
	name: string,
	apiRoute: string,
}

interface MainAppProps {
	apiAddress?: string;
	routes: [CmsRoute];
	theme: any; //TODO: be specific on what the user can customize
	logo: any;
	components: { name: string, slug: string, component: React.ComponentType }[];
}

function OpenCms(props: MainAppProps) {
	const { routes, theme, logo, apiAddress, components } = props;
	
	let remappedRoutes = {};

	for(let r in routes){
		remappedRoutes[`/admin/${slugify(routes[r].name)}`] = () =>(
		<ThemeProvider theme={theme}>
			<CmsPage 
				otherRoutes={routes} 
				apiRoute={apiAddress ? `${apiAddress}${routes[r].apiRoute}` : routes[r].apiRoute} 
				logo={logo}
				customComponents={components}
			/>
		</ThemeProvider>
		) 
	}

	const router = useRoutes(remappedRoutes);

	return router;
}

OpenCms.defaultProps = {
	routes: [
		{
			name: "home page",
			apiRoute: "/home-page",
		},
		{
			name: "about page",
			apiRoute: "/about-page",
		}
	],
	theme: {},
	logo: null,
	components: []
};

export default OpenCms;
