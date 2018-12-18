import * as React from 'react';
import KeithState from 'src/model/KeithState';

class KeithComponent<S extends KeithState> extends React.Component<any, S> {
	public setState(state: S) {
		super.setState(state);
		document.title = this.state.title;
	}
}

export default KeithComponent;