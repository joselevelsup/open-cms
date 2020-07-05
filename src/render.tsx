import * as React from "react";
import * as ReactDom from "react-dom";

import OpenCms from "./";

ReactDom.render(
		<OpenCms routes={[{ name: "home page", apiRoute: "/home" }]} />
	, document.getElementById("root"));
