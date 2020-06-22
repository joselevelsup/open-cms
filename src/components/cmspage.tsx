import * as React from "react";
import { CmsRoute } from "../";
import { firstObjectKey, slugify } from "../util";
import RenderComponent from "./render-component";
import axios, { AxiosResponse, AxiosError } from "axios";
import { IoMdAlert, IoMdAdd } from "react-icons/io";
import { SuccessButton, DangerButton, WarningButton } from "./styled/button";
import { DangerAlert } from "./styled/alert";
import { Cms, CmsHeader, CmsBody } from "./styled/cms";
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

interface CmsPageProps {
	otherRoutes: [CmsRoute];
	apiRoute: string;
	customComponents?: { name: string, component: React.ComponentType }[];
	logo: any;
}

interface CmsPageState {
	componentsForThisPage: CmsComponent[];
	needsUpdateAlert: boolean;
	componentList: { name: string, slug: string, component?: React.ComponentType }[]
	loadError: boolean;
	loadErrorMessage?: string;
}


export default class CmsPage extends React.Component<CmsPageProps, CmsPageState> {

	state = {
		componentsForThisPage: [],
		needsUpdateAlert: false,
		loadError: false,
		loadErrorMessage: "",
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
			}
		]
	}

	static defaultProps = {
		otherRoutes: [],
		logo: null,
		customComponents: []
	}

	loadComponentData = async () => {
		const { apiRoute } = this.props;
		const self = this;

		axios.get(apiRoute).then((resp: AxiosResponse) => {
			console.log(resp);
			const { data } = resp;
			let remappedData = data.map(t => {
				let remappedComponent = {};
				if(t.type == "nested"){
					let remappedNestedComponents = t.components.map(tc => ({
						[`${tc.type}-${tc.id}`]: {
							"title": tc.title,
							"value": tc.value
						}
					}));
					remappedComponent[`${t.type}-${t.id}`] = {
						"title": t.title,
						"components": remappedNestedComponents
					}
				} else {
					remappedComponent[`${t.type}-${t.id}`] = {
						"title": t.title,
						"value": t.value
					}
				}

				return remappedComponent;
			});

			self.setState({
				componentsForThisPage: remappedData
			});
		}).catch((err: AxiosError) => {
			self.setState({
				loadError: true,
				loadErrorMessage: err.message
			});
		})

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

		this.loadComponentData();
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
								"short-text-1": {
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

	setComponentAttr = (slug: string, attr: string = "value", parent?: boolean, childSlug?: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any): void => {
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
					console.log(nestedSpl);
					let nestedId: number = nestedSpl.length == 3 ? parseInt(nestedSpl[2]) : parseInt(nestedSpl[1]);
					const nestedTypeOfComponent: string = nestedSpl.length == 3 ? `${nestedSpl[0]}-${nestedSpl[1]}` : nestedSpl[0];
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
				const typeOfComponent: string = spl.length == 3 ? `${spl[0]}-${spl[1]}` : spl[0];
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
					let newComponent = {...c, [`${val.value}-${i+1}`]: c[oldComponent]};
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
		const { otherRoutes, logo, apiRoute } = this.props;
		const { componentsForThisPage, needsUpdateAlert, componentList, loadError, loadErrorMessage } = this.state;
		return (
			<Cms className="cms-page">
				<CmsHeader className="cms-header" logo={logo}>
					{
						logo &&
							<div className="header-logo">
								<img src={logo} />
							</div>
					}
					{
						otherRoutes.map((r: any, i: number) => (
							<div key={i} className="route-link">
								<a href={`/admin/${slugify(r.name)}`}>
									{r.name}
								</a>
							</div>
						))
					}
				</CmsHeader>
				<br />
				{
					loadError &&
						<DangerAlert>
							{`Unable to get CMS data from ${apiRoute}. (${loadErrorMessage})`}
						</DangerAlert>
				}
				<div className="cms-page-options">
					<DangerButton className="cms-option">
						Cancel
					</DangerButton>
					<WarningButton className="cms-option" onClick={this.loadComponentData}>
						Load CMS Data
					</WarningButton>
					<SuccessButton onClick={() => this.saveCmsData()} updateAlert={needsUpdateAlert} className="cms-option">
						<div style={{ display: "flex" }}>
							{needsUpdateAlert && <p><IoMdAlert color="white" style={{ width: "25px", height: "25px" }} /></p>}
							<p> Save Changes</p>
						</div>
					</SuccessButton>
				</div>
				<CmsBody className="cms-body">
					<div className="components">
						<>
							{
								componentList.map((c: any, i: number) => (
									<div className="component-item" key={i}>
										<p>
											{c.name}
										</p>
										<SuccessButton onClick={() => this.addComponentToList(c.slug)}>
											<IoMdAdd color="white" style={{ width: "16px", height: "16px"}} />
										</SuccessButton>
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
				</CmsBody>
			</Cms>
		);
	}
}
