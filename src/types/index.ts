import * as React from "react";

export type CmsRoute = {
	name: string,
	apiRoute: string,
}

export interface NewComponent {
	name: string;
	slug?: string;
	component?: React.ComponentType;
}

export interface MainAppProps {
	apiAddress?: string;
	routes: [CmsRoute];
	theme?: { secondary?: string, danger?: string, success?: string, warning?: string, pageColor?: string, headerColor?: string };
	logo?: any;
	components?: NewComponent[] | [];
	userPage?: boolean;
	userMap?: { name: string, key: string }[];
	userRoute?: string;
	locked?: boolean;
	credentials?: { username: string, password: string };
}

interface BasicCmsComponentEntry {
  title: string;
  value: string;
}

interface NestedCmsComponentEntry {
  components: [{
		[key: string]: BasicCmsComponentEntry
  }]
}

export interface CmsComponent {
  [key: string]: BasicCmsComponentEntry | NestedCmsComponentEntry
}

export interface ApiComponentData {
	id: number;
	title: string;
	value?: string;
	type: string;
	slug: string;
}

export interface ApiComponentDataWithNested extends ApiComponentData {
	components?: [ApiComponentData]
}


export interface CmsPageProps {
	otherRoutes: [CmsRoute];
	apiRoute: string;
	customComponents?: NewComponent[];
	logo?: any;
}

export interface CmsPageState {
	componentsForThisPage: CmsComponent[];
	needsUpdateAlert: boolean;
	componentList: NewComponent[];
	loadError: boolean;
	loadErrorMessage?: string | null;
}

export interface ComponentProps {
	slug: any;
	changeComponentAttr(slug: string, attr: string, parent?: boolean, childSlug?: string): (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | File | any) => void;
	deleteComponent(slug: string, parent?: boolean, childSlug?: string): void;
	addNestedComponent(slugKey: string): void;
	changeNestedComponent(e: React.ChangeEvent<HTMLSelectElement>, slugKey: string, oldComponent: string): void;
	componentList: NewComponent[]
}

export interface ComponentHeaderProps {
	name: string;
	value: string;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
	removeComponent(): void;
	type: string;
	changeComponent?(e: React.ChangeEvent<HTMLSelectElement>): void;
	changeAvailable?: boolean;
	componentlist?: NewComponent[];
}

