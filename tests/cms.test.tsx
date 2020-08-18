import * as React from "react";
import { mount, shallow } from "enzyme";
import CmsPage from "../src/components/cmspage";
import { NewComponent, CmsComponent } from "../src/types";
import mockServer from "../mock-api/server";

describe("CmsPage", () => {

	describe("CmsPage without API", () => {
		it("should render with only required props", () => {
			const wrapper = shallow(
				<CmsPage otherRoutes={[{ name: "home page", apiRoute: "/home"}]} apiRoute={"http://localhost:8080/home"} />
			);

			expect(wrapper).toMatchSnapshot();
		});

		it("should display other links in header", () => {
			const wrapper = shallow(
				<CmsPage otherRoutes={[{ name: "home page", apiRoute: "/home"}]} apiRoute={"http://localhost:8080/home"} />
			);

			const routeLinks = wrapper.find(".route-link");

			expect(routeLinks.length).toEqual(1);
		});

		it("should display available components by default", () => {
			const wrapper = shallow(
				<CmsPage otherRoutes={[{ name: "home page", apiRoute: "/home"}]} apiRoute={"http://localhost:8080/home"} />
			);

			const componentList = wrapper.find(".component-item");

			expect(componentList.length).toEqual(5);
		});

		it("should have an empty array state by default", () => {
			const wrapper = mount(
				<CmsPage otherRoutes={[{ name: "home page", apiRoute: "/home"}]} apiRoute={"http://localhost:8080/home"} />
			);

			const ComponentState: [] = wrapper.state("componentsForThisPage");

			expect(ComponentState.length).toEqual(0);
		});

		it("should add a custom component to componentList state", () => {
			const customComponents: NewComponent[] = [
				{
					name: "myComponent",
					slug: "my-component",
					component: ({ onComponentChange, name }) => <input name={name} onChange={(e) => onComponentChange(e)} />
				}
			];

			const wrapper = mount(
				<CmsPage customComponents={customComponents} otherRoutes={[{ name: "home page", apiRoute: "/home"}]} apiRoute={"http://localhost:8080/home"} />
			);

			const componentList: NewComponent[] = wrapper.state("componentList");

			expect(componentList.length).toEqual(6);
		});
	});
	
	describe("CmsPage with API", () => {
		let server: any;

		beforeEach(() => {
			server = mockServer({ environment: "test" });
		});

		afterEach(() => {
			server.shutdown()
		})

		it("should load initial data from API", () => {
			server.logging = true;

			jest.spyOn(CmsPage.prototype, "componentDidMount");

			const wrapper = shallow(
				<CmsPage otherRoutes={[{ name: "home page", apiRoute: "/home"}]} apiRoute={"/cms/home"} />
			);

			const componentInstance = wrapper.instance();

			componentInstance.componentDidMount();

			const componentState: any = componentInstance.state;
			console.log(componentState);
			expect(componentState.length).toEqual(3);
			expect(componentState[0]).toHaveProperty(["title", "value", "slug", "type"]);
			expect(componentState[1]).toHaveProperty(["components"]);
		});
	});
});
