export default function declensionText(number, gen, nom, plu) {
	number = number.toString();

	return number.match(/(0|[5-9]|1[0-9])$/) 
		? gen 
		: number.match(/1$/, number) 
		? nom 
		: plu
}