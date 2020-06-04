export const componentList = [
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
];

export const firstObjectKey = (obj: {}): string => {
	return Object.keys(obj)[0];
}
