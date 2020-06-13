import * as React from "react";
import { firstObjectKey, containsAny, removeLastItem } from "../util";

interface ComponentProps {
	slug: any;
	changeComponentAttr(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, slug: string, attr: string, parent?: boolean, childSlug?: string): void;
	deleteComponent(slug: string, parent?: boolean, childSlug?: string): void;
	addNestedComponent(slugKey: string): void;
	changeNestedComponent(e: React.ChangeEvent<HTMLSelectElement>, slugKey: string, oldComponent: string): void;
	componentList: { name: string, slug: string, component?: React.ComponentType}[]
}

interface ComponentHeaderProps {
	name: string;
	value: string;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
	removeComponent(): void
	type: string;
	changeComponent?(e: React.ChangeEvent<HTMLSelectElement>): void;
	changeAvailable?: boolean;
	componentlist?: { name: string, slug: string, component?: React.ComponentType }[]
}

const ComponentHeader: React.FC<ComponentHeaderProps> = ({ name, value, onChange, removeComponent, type, changeComponent, changeAvailable, componentlist }) => {
	const [ newComponentType, setNewComponentType ] = React.useState<string>("short-text");

	const changeThisComponent = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setNewComponentType(e.target.value);
		changeComponent(e);
	}

	return (
		<div className="component-header">
			<input name={name} value={value} onChange={onChange} placeholder="Title?" className="component-title" type="text" />
			{
				!type.includes("nested") &&
					<>
						{
							changeAvailable &&
							<select className="change-component" name="change-component" onChange={changeThisComponent} value={newComponentType}>
								{
									componentlist.map(c => (
										<>
											{
												c.name !== "nested" &&
													<option value={c.slug}>{c.name}</option>
											}
										</>
									))
								}
							</select>
						}
					</>
			}
			<button className="delete-component danger" onClick={removeComponent}>Delete</button>
		</div>
	)
}

const renderActualComponent = (slug: ComponentProps["slug"], onCompTextChange: ComponentProps["changeComponentAttr"], slugKey: string, child?: boolean, parentSlugKey?: string) => {
	const splitKey: string[] = slugKey.split("-"); 
	const typeOfInput: string = removeLastItem(splitKey);
	switch(typeOfInput){
		case "short-text":
			return (
				<input 
					name={`${slugKey}-value`} 
					type="text" value={slug[slugKey].value} 
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => !child ? onCompTextChange(e, slugKey, "value") : onCompTextChange(e, parentSlugKey, "value", true, slugKey)} 
					className="component-input"
				/>
			);
		case "long-text":
			return (
				<textarea 
					name={`${slugKey}-value`} 
					value={slug[slugKey].value} 
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => !child ? onCompTextChange(e, slugKey, "value") : onCompTextChange(e, parentSlugKey, "value", true, slugKey)} 
					className="component-input textarea" 
				/>
			);

		case "media": 
			return (
				<div className="media-container">
				</div>
			);
		case "link": 
			return (
				<div className="link-container">
					<input 
						name={`${slugKey}-value`} 
						type="text" 
						value={slug[slugKey].value} 
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => !child ? onCompTextChange(e, slugKey, "value") : onCompTextChange(e, parentSlugKey, "value", true, slugKey)} 
						className="component-input" 
					/>
					<a href={slug[slugKey].value}>Test this link</a>
				</div>
			)
		default:
			return <></>
	}
}

const renderCustomComponent = (slug: ComponentProps["slug"], onCompTextChange: ComponentProps["changeComponentAttr"], slugKey: string, componentList: {name: string, slug: string, component?: React.ComponentType}[], child?: boolean, parentSlugKey?: string) => {
	console.log(slugKey);
	const splitKey: string[] = slugKey.split("-"); 
	const typeOfInput: string = removeLastItem(splitKey);
	const CustomComponent: React.ComponentType = componentList.find(c => c.slug == typeOfInput).component;
	return (
		<div className="custom">
			<CustomComponent onComponentChange={onCompTextChange} name={slugKey} />
		</div>
	);
}

export default function({ componentList, changeComponentAttr, slug, deleteComponent, addNestedComponent, changeNestedComponent }: ComponentProps){
	const slugKey: string = firstObjectKey(slug);
	return (
	<div className="component-container">
		<ComponentHeader 
			name={`${slugKey}-title`} 
			value={slug[slugKey].title} 
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeComponentAttr(e, slugKey, "title")} 
			type={slugKey} 
			removeComponent={() => deleteComponent(slugKey)} 
		/>
		<div className="component">
			{
				!slugKey.includes("nested") ?
					<>
						{
							containsAny(slugKey, ["short", "long", "media", "link"]) ?
								<>
									{renderActualComponent(slug, changeComponentAttr, slugKey)}
								</>
								:
								<>
									{renderCustomComponent(slug, changeComponentAttr, slugKey, componentList)}
								</>
						}
					</>
					:
					<>
						{
							slug[slugKey].components.length >= 1 && slug[slugKey].components.map((c: any) => {
								const thisSlugKey = firstObjectKey(c);
								return (
									<>
										<ComponentHeader 
											name={`${thisSlugKey}-title`} 
											value={c[thisSlugKey].title} 
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeComponentAttr(e, slugKey, "title", true, thisSlugKey)} 
											type={thisSlugKey} 
											removeComponent={() => deleteComponent(slugKey, true, thisSlugKey)} 
											changeComponent={(e: React.ChangeEvent<HTMLSelectElement>) => changeNestedComponent(e, slugKey, thisSlugKey)}
											changeAvailable={true}
											componentlist={componentList}
										/>
										{
											containsAny(thisSlugKey, ["short", "long", "media", "link"]) ?
												<>
													{renderActualComponent(c, changeComponentAttr, thisSlugKey, true, slugKey)}
												</>
												:
												<>
													{renderCustomComponent(c, changeComponentAttr, thisSlugKey, componentList, true, slugKey)}
												</>
										}
									</>
								)
							})
						}
						<div className="nested-component-footer">
							<button onClick={() => addNestedComponent(slugKey)} className="add-component success">+ Add</button>
						</div>
					</>
			}
		</div>
	</div>
	)
}
