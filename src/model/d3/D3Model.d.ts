import { LoadingProps, LoadingState } from "../LoadingModel";
import Point from "../Point";

export class D3State extends LoadingState {
	currentLocation?: Point;
	circleSize: number;
	running: boolean;
	lastClick?: Point;
	updateInterval: number;
	moveDelta: number;
	keepPath: boolean;
	optionsExpanded: boolean;
}

export class D3Props extends LoadingProps {}
