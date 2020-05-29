import * as React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";

import AdminCMS from "./app";

ReactDom.render(
	<BrowserRouter>
		<AdminCMS />
	</BrowserRouter>, document.getElementById("root"));
