// Allow lazy conversion from JS to TS by accessing attributes of an object with index notation
declare class JsObject {
	[name: string]: any;
}

export default JsObject;
