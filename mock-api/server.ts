import { Server, Model, JSONAPISerializer, Request, Response } from "miragejs";

export default () => {
	new Server({
		models: {
			home: Model
		},
		serializers: {
			application: JSONAPISerializer
		},
		seeds(server) {
			server.db.loadData({
				home: [
					{ 
						"id": "1",
						"title": "short title",
						"slug": "short-title",
						"value": "short value",
						"type": "short-text"
					},
					{ 
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
					},
					{     
						"id": "3",
						"title": "linked title",
						"slug": "linked-title",
						"value": "http://google.com",
						"type": "link"
					}
				]
			})
		},
		routes() {
			this.namespace = "cms";

			this.get("/home", (schema: any): any => {
				let home = schema.db.home;

				return home;
			});

			this.put("/home", (schema: any, request: Request): any => {
				const newData = JSON.parse(request.requestBody);
				const homeData = schema.db.home;
				homeData.update(newData);

				return new Response(200, {}, []);
			});
		}
	})
}
