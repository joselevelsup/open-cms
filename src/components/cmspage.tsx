import * as React from "react";
import { RouteProps, Link } from "react-router-dom";
import { CmsRoute } from "../app";
import { componentList } from "../util";
import RenderComponent from "./render-component";
import axios, { AxiosResponse, AxiosError } from "axios";
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

interface CmsPageProps extends RouteProps {
	otherRoutes: [CmsRoute],
	apiRoute: string
}

interface CmsPageState {
	componentsForThisPage: CmsComponent[];
}


export default class CmsPage extends React.Component<CmsPageProps, CmsPageState> {

	state = {
		componentsForThisPage: []
	}

	static defaultProps = {
		otherRoutes: [],
		apiRoute: "http://localhost:8080"
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

	setComponentAttr = (e: React.ChangeEvent<HTMLInputElement>, slug: string, attr: string, parent?: boolean, childSlug?: string): void => {
		const val = e.target;
		this.setState(state => {
			const currentComponents = [...state.componentsForThisPage];
			const slugIndex = currentComponents.findIndex((s: CmsComponent) => {
				const sl = Object.keys(s)[0];
				return slug == sl;
			});

			if(parent){
				currentComponents[slugIndex][slug]["components"][childSlug] = {
					...currentComponents[slugIndex][slugIndex]["components"][childSlug],
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
					if(slug == Object.keys(cc)[0]){
						cc[slug].components = cc[slug].components.filter(c => childSlug != Object.keys(c)[0]);
						return cc;
					}

					return cc;
				});
			} else {
				newSetComponents = currentComponents.filter((s: CmsComponent) => slug != Object.keys(s)[0]);
			}

			console.log(newSetComponents);

			return {
				componentsForThisPage: newSetComponents
			}
		});	
	}

	saveCmsData = (): void => {
		const { componentsForThisPage } = this.state;
		const data = componentsForThisPage.map((c: CmsComponent) => {
			let key = Object.keys(c)[0];
			let spl: string[] = key.split("-");
			const typeOfComponent: string = `${spl[0]}-${spl[1]}`;
			let componentData = {
				title: c[key]["title"],
				value: c[key]["value"],
				type: typeOfComponent
			};

			return componentData;
		});

		axios.put(this.props.apiRoute, data).then((resp: AxiosResponse) => {
			console.log(resp);
		}).catch((err: AxiosError) => {
			console.log(err);
		})	
	}

	render(){
		const { otherRoutes } = this.props;
		const { componentsForThisPage } = this.state;
		console.log(componentsForThisPage);
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
						Save Changes
					</button>
				</div>
				<div className="cms-body">
					<div className="components">
						<ul>
							{
								componentList.map((c: any, i: number) => (
									<li key={i}>
										<p>
											{c.name}
										</p>
										<button onClick={() => this.addComponentToList(c.slug)}>
											+
										</button>
									</li>
								))
							}
						</ul>
					</div>
					<div className="main">
						{
							componentsForThisPage.map((c: CmsComponent, i: number) => (
								<RenderComponent key={i} slug={c} changeComponentAttr={this.setComponentAttr} deleteComponent={this.removeComponent} />
							))
						}
					</div>
				</div>
			</div>
		);
	}
}
