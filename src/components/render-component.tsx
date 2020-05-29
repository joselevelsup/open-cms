import * as React from "react";

interface ComponentProps {
	slug: any;
	changeComponentAttr(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, slug: string, attr: string): void;
	deleteComponent(slug: string): void;
}

const renderActualComponent = (slug: ComponentProps["slug"], onCompTextChange: ComponentProps["changeComponentAttr"]) => {
	const slugKey: string = Object.keys(slug)[0];
	const splitKey: string[] = slugKey.split("-"); 
	const typeOfInput: string = `${splitKey[0]}-${splitKey[1]}`;
	switch(typeOfInput){
		case "short-text":
			return (
				<input name={`${slugKey}-value`} type="text" value={slug[slugKey].value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCompTextChange(e, slugKey, "value")} className="component-input" />
			);
		case "long-text":
			return (
				<textarea name={`${slugKey}-value`} value={slug[slugKey].value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onCompTextChange(e, slugKey, "value")} className="component-input textarea" />
			);
		default:
			return <></>
	}
}

export default function(props: ComponentProps){
	const { changeComponentAttr, slug, deleteComponent } = props;
	console.log(slug);
	const slugKey: string = Object.keys(slug)[0];
	return (
		<div className="component-container">
			<div className="component-header">
				<input name={`${slugKey}-title`} value={slug[slugKey].title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeComponentAttr(e, slugKey, "title")} placeholder="Title?" className="component-title" />
				<button className="delete-component" onClick={() => deleteComponent(slugKey)}>Delete</button>
			</div>
			<div className="component">
				{renderActualComponent(props.slug, changeComponentAttr)}
			</div>
		</div>
	)
}
