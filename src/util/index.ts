export const firstObjectKey = (obj: {}): string => {
	return Object.keys(obj)[0];
}

export const slugify = (s: string): string => {
	return s.split(" ").join("-");
}

export const containsAny = (s: string, arr: string[]): boolean => {
	for(let i in arr){
		if(s.includes(arr[i])){
			return true;
		}
	}

	return false;
}
