declare class SimpleDate {
	public month: number;
	public day: number;
	public year?: number;
}

declare class Holiday {
	public date: SimpleDate;
	public link: string;
	public name: string;
}

export { SimpleDate, Holiday };
