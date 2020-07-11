import * as React from "react";
import { firstObjectKey, containsAny, removeLastItem } from "../util";
import { CmsInputHeader, CmsInput, CmsTextarea, CmsFileUpload } from "./styled/input";
import { DangerButton, SuccessButton } from "./styled/button";
import { useDropzone } from "react-dropzone";

interface ComponentProps {
	slug: any;
	changeComponentAttr(slug: string, attr: string, parent?: boolean, childSlug?: string): (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | File | any) => void;
	deleteComponent(slug: string, parent?: boolean, childSlug?: string): void;
	addNestedComponent(slugKey: string): void;
	changeNestedComponent(e: React.ChangeEvent<HTMLSelectElement>, slugKey: string, oldComponent: string): void;
	componentList: { name: string, slug: string, component?: React.ComponentType}[]
}

interface ComponentHeaderProps {
	name: string;
	value: string;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
	removeComponent(): void;
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
			<CmsInputHeader name={name} value={value} onChange={onChange} placeholder="Title?" type="text" />
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
			<DangerButton className="delete-component" onClick={removeComponent}>Delete</DangerButton>
		</div>
	)
}

const renderActualComponent = (slug: ComponentProps["slug"], onCompTextChange: ComponentProps["changeComponentAttr"], slugKey: string, child?: boolean, parentSlugKey?: string) => {
	const splitKey: string[] = slugKey.split("-"); 
	const typeOfInput: string = removeLastItem(splitKey);
	switch(typeOfInput){
		case "short-text":
			return (
				<CmsInput
					name={`${slugKey}-value`} 
					type="text"
					value={slug[slugKey].value}
					onChange={!child ? onCompTextChange(slugKey, "value") : onCompTextChange(parentSlugKey, "value", true, slugKey)} 
					className="component-input"
				/>
			);
		case "long-text":
			return (
				<CmsTextarea
					name={`${slugKey}-value`}
					value={slug[slugKey].value} 
					onChange={!child ? onCompTextChange(slugKey, "value") : onCompTextChange(parentSlugKey, "value", true, slugKey)} 
					className="component-input textarea" 
				/>
			);

		case "media":
			const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
			return (
				<div className="media-container">
					{
						acceptedFiles && acceptedFiles.length >= 1 &&
							<div className="uploader">
								<img src={URL.createObjectURL(acceptedFiles[0])} />
								<br />
								<SuccessButton onClick={() => onCompTextChange(slugKey, "value")(acceptedFiles[0])}>Upload</SuccessButton>
							</div>
					}
					<CmsFileUpload {...getRootProps({ noDrag: true })}>
						<input {...getInputProps({ multiple: false })} />
						<div>Click here to choose a picture</div>
					</CmsFileUpload>
				</div>
			);
		case "link": 
			return (
				<div className="link-container">
					<CmsInput
						name={`${slugKey}-value`} 
						type="text" 
						value={slug[slugKey].value} 
						onChange={!child ? onCompTextChange(slugKey, "value") : onCompTextChange(parentSlugKey, "value", true, slugKey)} 
						className="component-input link" 
					/>
					<a href={slug[slugKey].value}>Test this link</a>
				</div>
			)
		default:
			return <></>
	}
}

const renderCustomComponent = (slug: ComponentProps["slug"], onCompTextChange: ComponentProps["changeComponentAttr"], slugKey: string, componentList: {name: string, slug: string, component?: React.ComponentType}[], child?: boolean, parentSlugKey?: string) => {
	const splitKey: string[] = slugKey.split("-"); 
	const typeOfInput: string = removeLastItem(splitKey);
	const CustomComponent: any = componentList.find(c => c.slug == typeOfInput).component;
	return (
		<div className="custom">
			<CustomComponent onComponentChange={!child ? onCompTextChange(slugKey, "value") : onCompTextChange(parentSlugKey, "value", true, slugKey)} nested={child} name={slugKey} />
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
			onChange={changeComponentAttr(slugKey, "title")} 
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
											onChange={changeComponentAttr(slugKey, "title", true, thisSlugKey)} 
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
							<SuccessButton onClick={() => addNestedComponent(slugKey)} className="add-component">+ Add</SuccessButton>
						</div>
					</>
			}
		</div>
	</div>
	)
}
