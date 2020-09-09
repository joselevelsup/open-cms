import faker from "faker";

describe("OpenCms", () => {
	beforeEach(() => {
		cy.visit("/admin/home-page")
			.get(".component-container")
			.should("have.length", 3); // checks if test data is loaded so the other tests can be performed
	});

	it("should add new component", () => {
		cy.get(".component-item:first button")
			.click()
			.get(".component-container")
			.should("have.length", 4);
	});

	it("should add all components available", () => {
		cy.get(".component-item button")
			.click({ multiple: true })
			.get(".component-container")
			.should("have.length", 8);
	});

	it("should delete a component", () => {
		cy.get(".component-container > .component-header:first > .delete-component")
			.click()
			.get(".component-container")
			.should("have.length", 2);
	});

	it("should fill out a short text component", () => {
		cy.get(".component-item:first button")
			.click()
			.get('.component-container > .component-header:last > input[name="short-text-4-title"]')
			.type(faker.lorem.word())
			.get('.component-container > .component:last > input[name="short-text-4-value"]')
			.type(faker.lorem.words(10));
	});

	it("should fill out a long text component", () => {
		cy.get(".component-item:nth-child(2) button")
			.click()
			.get('.component-container > .component-header:last > input[name="long-text-4-title"]')
			.type(faker.lorem.word())
			.get('.component-container > .component:last > textarea[name="long-text-4-value"]')
			.type(faker.lorem.words(50));
	})

});
