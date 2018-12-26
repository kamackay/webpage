import { LoadingProps, LoadingState } from "../LoadingModel";
import Point from "../Point";

declare class D3State extends LoadingState {
	currentLocation?: Point;
	running: boolean;
	lastClick?: Point;
	updateInterval: number;
	moveDelta: number;
	keepPath: boolean;
}

declare class D3Props extends LoadingProps {}

export { D3State, D3Props };
