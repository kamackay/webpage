import { Holiday } from "./Holiday";

// Allow lazy conversion from JS to TS by accessing attributes of an object with index notation
declare class ListState {
	holidays: Holiday[];
}

export default ListState;
