declare interface IServer {
	configure(): void;
	start(port: number): void;
}

export default IServer;
