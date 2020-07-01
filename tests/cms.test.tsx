import * as React from "react";
import { mount } from "enzyme";
import CmsPage from "../src/components/cmspage";

describe("CmsPage", () => {
	it("CmsPage Renders with only required props", () => {
		const wrapper = mount(
			<CmsPage otherRoutes={[{ name: "home page", apiRoute: "/home"}]} apiRoute={"/home"} />
		);

		expect(wrapper).toMatchSnapshot();
	});
});
