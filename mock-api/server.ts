import { Server, Model } from "miragejs";

export default () => {
	new Server({
		models: {
			home: Model
		},
		seeds(server) {
			server.create("home", { 
				"id": "1",
				"title": "short title",
				"slug": "short-title",
				"value": "short value",
				"type": "short-text"
			});
			server.create("home", { 
				"id": "2",
				"title": "nested title",
				"slug": "nested-title",
				"components": [
					{
						"id": 1,
						"title": "this-is-a-nested-title",
						"value": "this is a nested value",
						"type": "short-text"
					}
				],
				"type": "nested"
			});
			server.create("home", {     
				"id": "3",
				"title": "linked title",
				"slug": "linked-title",
				"value": "http://google.com",
				"type": "link"
			});
		},
		routes() {
			this.namespace = "/api";

			this.put("/home", (schema, request) => {
			})
		}
	})
}
