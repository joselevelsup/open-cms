export const firstObjectKey = (obj: {}): string => {
	return Object.keys(obj)[0];
}

export const slugify = (s: string): string => {
	return s.split(" ").join("-");
}
