import * as React from "react";
import { Holiday } from "src/model/Holiday";
import ListState from "src/model/ListState";

class Holidays extends React.Component<any, ListState> {
	// Initialize the state
	constructor(props: string[]) {
		super(props);
		this.state = {
			holidays: []
		};
	}

	// Fetch the list on first mount
	public componentDidMount() {
		this.getList();
	}

	// Retrieves the list of items from the Express app
	public getList() {
		fetch(`http://localhost:5000/holidays/`)
			.then(res => res.json())
			.then((data: any) => {
				this.setState({ holidays: data });
			});
	}

	public render() {
		const { holidays } = this.state;

		// tslint:disable-next-line:no-console
		console.log(JSON.stringify(holidays));

		return (
			<div className="App">
				<h1>List of Holidays this year</h1>
				{/* Check to see if any items are found*/}
				{holidays && holidays.length ? (
					<div>
						{/* Render the list of items */}
						{holidays.map((item: Holiday) => {
							return <div key={item.name}><a href={item.link}>{item.name}</a></div>;
						})}
					</div>
				) : (
					<div>
						<h2>No Holidays Found</h2>
					</div>
				)}
			</div>
		);
	}
}

export default Holidays;
