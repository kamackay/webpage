import * as React from "react";
import KeithState from "src/model/KeithState";

class KeithComponent<S extends KeithState> extends React.Component<any, S> {
	public setState(state: S) {
		super.setState(state);
		document.title = this.state.title;
		this.setFavicon(this.state.faviconUrl);
	}

	public setFavicon(url: string) {
		const link =
			(document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
			document.createElement("link");
		link.type = "image/x-icon";
		link.rel = "shortcut icon";
		link.href = url;
		document.getElementsByTagName("head")[0].appendChild(link);
	}
}

export default KeithComponent;
