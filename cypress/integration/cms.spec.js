describe("OpenCms", () => {
	it("should load the cms", () => {
		cy.visit("/admin/home-page");
	});

	it("should load initial data", () => {
		cy.visit("/admin/home-page")
		.get(".component-container")
		.should("have.length", 3);
	});

	it("should add new component", () => {
	})
});
