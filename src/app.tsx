import * as React from "react";
import { Route } from "react-router-dom";
import CmsPage from "./components/cmspage";

enum MethodTypes {
	GET,
	POST,
	PUT,
	DELETE
}

export type CmsRoute = {
	name: string,
	apiRoute: string,
	methods: [MethodTypes]
}

interface MainAppProps {
	apiAddress?: string,
	routes: [CmsRoute]
}

function AdminCMS(props: MainAppProps) {
	const { routes } = props;

	return (
		<>
			{
				routes.map((r: CmsRoute, i: number, arr: [CmsRoute]) => (
					<Route path={`/admin${r.apiRoute}`} render={routeProps => <CmsPage otherRoutes={arr} apiRoute={r.apiRoute} {...routeProps} />} />
				))
			}
		</>
	)
}

AdminCMS.defaultProps = {
	routes: [
		{
			name: "home page",
			apiRoute: "/home-page",
			methods: ["POST"]
		}
	]
};

export default AdminCMS;
