import { Server, Model, JSONAPISerializer, Request, Response, ModelInstance } from "miragejs";
import faker from "faker";

function makeNewUsers(){
	let newUsers = [1, 2, 3].map((i: number) => ({ 
		id: i, 
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email()
	}));

	return newUsers;
}

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
				],
				users: makeNewUsers()
			})
		},
		routes() {
			this.namespace = "cms";

			this.get("/home", (schema: any): ModelInstance => {
				let home: ModelInstance = schema.db.home;

				return home;
			});

			this.put("/home", (schema: any, request: Request): Response => {
				const newData = JSON.parse(request.requestBody);
				const homeData = schema.db.home;
				homeData.update(newData);

				return new Response(200, {}, []);
			});

			this.get("/users", (schema: any): ModelInstance => {
				const users: ModelInstance = schema.db.users;

				return users;
			});

			this.delete("/user/:id", (schema: any, request: Request): Response => {
				const queriedUser: ModelInstance = schema.db.users.findById(request.params.id);

				queriedUser.destroy();

				return new Response(200, {}, { message: "user deleted" });
			});
		}
	})
}
