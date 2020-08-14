import * as React from "react";
import * as ReactDom from "react-dom";

import OpenCms from "./";

import mockApiServer from "../mock-api/server";

if(process.env.NODE_ENV == "development"){
	mockApiServer();
}

ReactDom.render(
		<OpenCms routes={[{ name: "home page", apiRoute: "/cms/home" }]} />
	, document.getElementById("root"));

