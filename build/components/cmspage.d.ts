import * as React from "react";
import "../styles/index.scss";
import { CmsPageProps, CmsPageState } from "../types";
export default class CmsPage extends React.Component<CmsPageProps, CmsPageState> {
    state: {
        componentsForThisPage: any[];
        needsUpdateAlert: boolean;
        loadError: boolean;
        loadErrorMessage: string;
        componentList: {
            name: string;
            slug: string;
        }[];
    };
    static defaultProps: {
        otherRoutes: any[];
        logo: any;
        customComponents: any[];
    };
    loadComponentData: () => Promise<void>;
    componentDidMount(): void;
    componentDidUpdate(_prevProps: CmsPageProps, prevState: CmsPageState): void;
    addComponentToList: (slug: string) => void;
    setComponentAttr: (slug: string, attr?: string, parent?: boolean, childSlug?: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | File | any) => void;
    removeComponent: (slug: string, parent?: boolean, childSlug?: string) => void;
    saveCmsData: () => void;
    createNestedComponent: (nestedSlug: string) => void;
    changeNestedComponent: (e: React.ChangeEvent<HTMLSelectElement>, nestedSlug: string, oldComponent: string) => void;
    render(): JSX.Element;
}
