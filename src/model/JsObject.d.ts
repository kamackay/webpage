// Allow lazy conversion from JS to TS by accessing attributes of an object with index notation
export default class JsObject {
  [name: string]: any;
}
