import PageServer from "./PageServer";
import RestServer from "./RestServer";

const pageServer = new PageServer();
pageServer.start(1500);

const restServer = new RestServer();
restServer.start(5000);

export { pageServer, restServer };
