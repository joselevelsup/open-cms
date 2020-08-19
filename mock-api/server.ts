import { Server, Model, JSONAPISerializer, Request, Response, ModelInstance } from "miragejs";
import faker from "faker";

type ExampleUser = {
	id: number,
	firstName: string,
	lastName: string,
	email: string
}

type ExampleCmsData = {
	id: number | string,
	title: string,
	slug: string,
	type: string,
	value?: string,
	components?: ExampleCmsData[]
};

export function makeNewUsers(){
	let newUsers = [1, 2, 3].map((i: number) => ({ 
		id: i, 
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email(),
	}));

	return newUsers;
}

export function makeCmsData(){
	return [
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
					"slug": "this-is-a-nested-title",
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
	];
}

export default function mockServer ({ environment = "development" }){
	return new Server({
		environment,
		models: {
			home: Model,
			user: Model
		},
		serializers: {
			application: JSONAPISerializer
		},
		seeds(server) {
			server.db.loadData({
				home: makeCmsData(),
				users: makeNewUsers()
			})
		},
		routes() {
			this.namespace = "cms";

			this.get("/home", (schema: any): any => {
				return schema.db.home;
			});

			this.put("/home", (schema: any, request: Request): Response => {
				const newData = JSON.parse(request.requestBody);
				const homeData = schema.db.home;
				homeData.update(newData);

				return new Response(200, {}, []);
			});

			this.get("/users", (schema: any): ModelInstance => {
				const users: ModelInstance = schema.users.all();

				return users;
			});

			this.put("/users/:id/reset/password", (schema: any, request: Request): Response => {
				const body = JSON.parse(request.requestBody);
				const user = schema.users.find(request.params.id);
				
				if(user){
					if(body.data.newPassword){
						return new Response(200, {}, { message: "password reset" });
					} else {
						return new Response(200, {}, { message: "password reset email sent" });
					}
				} else {
					return new Response(500, {}, []);
				}
			})

			this.delete("/users/:id", (schema: any, request: Request): Response => {
				const user = schema.users.find(request.params.id);

				if(user){
					schema.users.remove(request.params.id);
					return new Response(200, {}, { message: "user deleted" });
				} else {
					return new Response(500, {}, {});
				}

			});
		}
	})
}
