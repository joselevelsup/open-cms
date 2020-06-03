import * as React from "react";

interface ComponentProps {
	slug: any;
	changeComponentAttr(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, slug: string, attr: string, parent?: boolean, childSlug?: string): void;
	deleteComponent(slug: string, parent?: boolean, childSlug?: string): void;
}

interface ComponentHeaderProps {
	name: string;
	value: string;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
	removeComponent(): void
	type: string
}

const ComponentHeader: React.FC<ComponentHeaderProps> = ({ name, value, onChange, removeComponent, type }) => (
	<div className="component-header">
		{
			!type.includes("nested") &&
			<input name={name} value={value} onChange={onChange} placeholder="Title?" className="component-title" />
		}
		<button className="delete-component" onClick={removeComponent}>Delete</button>
	</div>
)

const renderActualComponent = (slug: ComponentProps["slug"], onCompTextChange: ComponentProps["changeComponentAttr"], slugKey: string, child?: boolean, parentSlugKey?: string) => {
	const splitKey: string[] = slugKey.split("-"); 
	const typeOfInput: string = splitKey.length == 3 ? `${splitKey[0]}-${splitKey[1]}` : splitKey[0];
	switch(typeOfInput){
		case "short-text":
			return (
				<input name={`${slugKey}-value`} type="text" value={slug[slugKey].value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => !child ? onCompTextChange(e, slugKey, "value") : onCompTextChange(e, parentSlugKey, "value", true, slugKey)} className="component-input" />
			);
		case "long-text":
			return (
				<textarea name={`${slugKey}-value`} value={slug[slugKey].value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onCompTextChange(e, slugKey, "value")} className="component-input textarea" />
			);

		case "media": 
			return (
				<div className="media-container">
				</div>
			);
		case "link": 
			return (
				<div className="link-container"></div>
			)
		default:
			return <></>
	}
}

export default function(props: ComponentProps){
	const { changeComponentAttr, slug, deleteComponent } = props;
	const slugKey: string = Object.keys(slug)[0];
	console.log(slug);
	return (
	<div className="component-container">
		<ComponentHeader name={`${slugKey}-title`} value={slug[slugKey].title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeComponentAttr(e, slugKey, "title")} type={slugKey} removeComponent={() => deleteComponent(slugKey)} />
		<div className="component">
			{
				!slugKey.includes("nested") ?
					<>
						{renderActualComponent(slug, changeComponentAttr, slugKey)}
					</>
					:
					<>
						{
							slug[slugKey].components.length >= 1 && slug[slugKey].components.map((c: any) => {
								const thisSlugKey = Object.keys(c)[0];
								return (
									<>
										<ComponentHeader name={`${thisSlugKey}-title`} value={c[thisSlugKey].title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeComponentAttr(e, slugKey, "title", true, thisSlugKey)} type={thisSlugKey} removeComponent={() => deleteComponent(slugKey, true, thisSlugKey)}/>
										{renderActualComponent(c, changeComponentAttr, thisSlugKey, true, slugKey)}
									</>
								)
							})
						}
					</>
			}
		</div>
	</div>
	)
}
