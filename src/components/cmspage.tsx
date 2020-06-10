import * as React from "react";
import { RouteProps, Link } from "react-router-dom";
import { CmsRoute } from "../app";
import { firstObjectKey, slugify } from "../util";
import RenderComponent from "./render-component";
import axios, { AxiosResponse, AxiosError } from "axios";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "../styles/index.scss";

interface BasicCmsComponentEntry {
  title: string,
  value: string
}

interface NestedCmsComponentEntry {
  components: [{
		[key: string]: BasicCmsComponentEntry
  }]
}

interface CmsComponent {
  [key: string]: BasicCmsComponentEntry | NestedCmsComponentEntry
}

interface ApiComponentData {
	id: number;
	title: string;
	value?: string;
	type: string;
	slug: string;
}

interface ApiComponentDataWithNested extends ApiComponentData {
	components?: [ApiComponentData]
}

interface CmsPageProps extends RouteProps {
	otherRoutes: [CmsRoute];
	apiRoute: string;
	customComponents?: { name: string, component: React.ComponentType }[]
}

interface CmsPageState {
	componentsForThisPage: CmsComponent[];
	needsUpdateAlert: boolean;
	componentList: { name: string, slug: string, component?: React.ComponentType }[]
}


export default class CmsPage extends React.Component<CmsPageProps, CmsPageState> {

	state = {
		componentsForThisPage: [],
		needsUpdateAlert: false,
		componentList: [
			{
				name: "short text",
				slug: "short-text"
			},
			{
				name: "long text",
				slug: "long-text"
			}, 
			{
				name: "nested",
				slug: "nested"
			},
			{
				name: "media",
				slug: "media"
			},
			{
				name: "link",
				slug: "link"
			},
			{
				name: "message",
				slug: "message",
				component: ({ onComponentChange, name }) => {
					const mdParser = new MarkdownIt();
					return (
						<MdEditor
							value=""
							style={{ height: "500px" }}
							renderHTML={(text) => mdParser.render(text)}
							onChange={(data) => onComponentChange(data.text, name)}
						/>
					)
				}
			}
		]
	}

	static defaultProps = {
		otherRoutes: [],
		apiRoute: "http://localhost:8080"
	}

	componentDidMount(){
		const { customComponents } = this.props;
		if(customComponents){
			const newComponents = customComponents.map(c => ({
				...c,
				slug: slugify(c.name)
			}));

			this.setState(state => ({
				componentList: [...state.componentList, ...newComponents]
			}));
		}
	}

	componentDidUpdate(_prevProps: CmsPageProps, prevState: CmsPageState){
		const { componentsForThisPage } = this.state;
		if(prevState.componentsForThisPage !== componentsForThisPage){
			this.setState({
				needsUpdateAlert: true
			});
		}
	}

	addComponentToList = (slug: string): void => {
		this.setState(state => {
			const currentComponents = [...state.componentsForThisPage];
			if(slug.includes("nested")){
				currentComponents.push({
					[`${slug}-${currentComponents.length+1}`]: {
						components: [
							{
								"n-short-text-1": {
									title: "",
									value: ""
								}	
							}
						]
					}
				});
			} else {
				currentComponents.push({
					[`${slug}-${currentComponents.length+1}`]: {
						title: "",
						value: ""
					}
				});
			}

			return {
				componentsForThisPage: currentComponents
			};
		})
	}

	setComponentAttr = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any, slug: string, attr: string = "value", parent?: boolean, childSlug?: string): void => {
		const val = e.target ? e.target : { value: e };
		this.setState(state => {
			const currentComponents = [...state.componentsForThisPage];
			const slugIndex = currentComponents.findIndex((s: CmsComponent) => {
				const sl = firstObjectKey(s);
				return slug == sl;
			});

			if(parent){
				const childSlugIndex = currentComponents[slugIndex][slug]["components"].findIndex((s: CmsComponent) => firstObjectKey(s) == childSlug);

				currentComponents[slugIndex][slug]["components"][childSlugIndex][childSlug] = {
					...currentComponents[slugIndex][slug]["components"][childSlugIndex][childSlug],
					[attr]: val.value
				}
			} else {
				currentComponents[slugIndex] = {
					[slug]: {
						...currentComponents[slugIndex][slug],
						[attr]: val.value
					}
				};
			}



			return {
				componentsForThisPage: currentComponents
			};
		});
	}
	


	removeComponent = (slug: string, parent?: boolean, childSlug?: string): void => {
		this.setState(state => {
			const currentComponents = [...state.componentsForThisPage];
			let newSetComponents: any;
			if(parent){
				newSetComponents = currentComponents.map((cc: any) => {
					if(slug == firstObjectKey(cc)){
						cc[slug].components = cc[slug].components.filter((c: CmsComponent) => childSlug != firstObjectKey(c));
						return cc;
					}

					return cc;
				});
			} else {
				newSetComponents = currentComponents.filter((s: CmsComponent) => slug != firstObjectKey(s));
			}

			return {
				componentsForThisPage: newSetComponents
			}
		});	
	}

	saveCmsData = (): void => {
		const { componentsForThisPage } = this.state;
		const data = componentsForThisPage.map((c: CmsComponent) => {
			let key = firstObjectKey(c);
			let spl: string[] = key.split("-");
			let componentData: ApiComponentDataWithNested;

			if(spl[0] == "nested"){
				let id: number = parseInt(spl[1]);
				let components: [ApiComponentData] = c[key]["components"].map((nc: CmsComponent) => {
					let nestedKey = firstObjectKey(nc);
					let nestedSpl: string[] = nestedKey.split("-");
					let nestedId: number = nestedSpl.length == 4 ? parseInt(nestedSpl[3]) : parseInt(nestedSpl[2]);
					const nestedTypeOfComponent: string = nestedSpl.length == 4 ? `${nestedSpl[1]}-${nestedSpl[2]}` : nestedSpl[1];
					return {
						id: nestedId,
						title: slugify(nc[nestedKey]["title"]),
						value: nc[nestedKey]["value"],
						type: nestedTypeOfComponent
					}
				});

				componentData = {
					id,
					title: c[key]["title"],
					slug: slugify(c[key]["title"]),
					components,
					type: spl[0]
				}
			} else {
				const typeOfComponent: string = `${spl[0]}-${spl[1]}`;
				let id: number = spl.length == 3 ? parseInt(spl[2]) : parseInt(spl[1]);
				componentData = {
					id,
					title: c[key]["title"],
					slug: slugify(c[key]["title"]),
					value: c[key]["value"],
					type: typeOfComponent
				};
			}

			return componentData;
		});

		console.log(data);

		/* axios.put(this.props.apiRoute, data).then((resp: AxiosResponse) => { */
		/* 	console.log(resp); */
		/* }).catch((err: AxiosError) => { */
		/* 	console.log(err); */
		/* }) */	
	}

	createNestedComponent = (nestedSlug: string): void => {
		this.setState(state => {
			const currentComponents = [...state.componentsForThisPage];

			const nestedIndex = currentComponents.findIndex(c => nestedSlug == firstObjectKey(c));

			currentComponents[nestedIndex][nestedSlug]["components"].push({
				[`short-text-${currentComponents[nestedIndex][nestedSlug]["components"].length+1}`]: {
					title: "",
					value: ""
				}
			});

			return {
				componentsForThisPage: currentComponents
			}

		})
	}

	changeNestedComponent = (e: React.ChangeEvent<HTMLSelectElement>, nestedSlug: string, oldComponent: string) => {
		const val = e.target;
		this.setState(state => {
			const currentComponents = [...state.componentsForThisPage];

			const nestedIndex = currentComponents.findIndex(c => nestedSlug == firstObjectKey(c));

			const changedComponentList = currentComponents[nestedIndex][nestedSlug]["components"].map((c: CmsComponent, i: number) =>{
				if(oldComponent == firstObjectKey(c)){
					let newComponent = {...c, [`n-${val.value}-${i+1}`]: c[oldComponent]};
					delete newComponent[oldComponent];

					return newComponent;
				} else {
					return c
				}
			});

			currentComponents[nestedIndex][nestedSlug]["components"] = changedComponentList;

			return {
				componentsForThisPage: currentComponents
			}
		});
	}

	render(){
		const { otherRoutes } = this.props;
		const { componentsForThisPage, needsUpdateAlert, componentList } = this.state;
		return (
			<div className="cms-page">
				<div className="cms-header">
					{
						otherRoutes.map((r: any, i: number) => (
							<div key={i} className="route-link">
								<Link to={`/admin/${r.name}`}>
									{r.name}
								</Link>
							</div>
						))
					}
				</div>
				<br />
				<div className="cms-page-options">
					<button className="cms-option danger">
						Cancel
					</button>
					<button onClick={() => this.saveCmsData()} className="cms-option success">
						{`${needsUpdateAlert ? "! " : ""}Save Changes`}
					</button>
				</div>
				<div className="cms-body">
					<div className="components">
						<>
							{
								componentList.map((c: any, i: number) => (
									<div className="component-item" key={i}>
										<p>
											{c.name}
										</p>
										<button className="success" onClick={() => this.addComponentToList(c.slug)}>
											+
										</button>
									</div>
								))
							}
						</>
					</div>
					<div className="main">
						{
							componentsForThisPage.map((c: CmsComponent, i: number) => (
								<RenderComponent key={i} slug={c} changeComponentAttr={this.setComponentAttr} deleteComponent={this.removeComponent} addNestedComponent={this.createNestedComponent} changeNestedComponent={this.changeNestedComponent} componentList={componentList} />
							))
						}
					</div>
				</div>
			</div>
		);
	}
}
