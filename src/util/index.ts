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

export const removeLastItem = (arr: string[]): string => {
	let newArr = [];
	for(let i = 0; i < arr.length; i++){
		if(i + 1 != arr.length){
			newArr.push(arr[i])
		}
	}

	return newArr.join("-");
}


export const randomId = (length: number) => {
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var randS = "";

	while(length > 0) {
			randS += chars.charAt(Math.floor(Math.random() * chars.length));
			length--;
	}

	return randS;
}
