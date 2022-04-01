import express from "express";
import https from "https";
import fs from "fs";

class App {
	constructor(config = {}) {
		this.config = config;

		this.startServer();

		return this.express;
	}
	
	startServer() {
		this.express = express();

		const key = fs.readFileSync("../certs/kiszka.key");
		const cert = fs.readFileSync("../certs/kiszka.crt");

		//  Server creation starts here
		const server = https.createServer({ key, cert }, this.express);
		server.listen(this.config.port, err => {
			if (err) {
				console.log("Well, this didn't work...");
				process.exit();
			}
			console.log(`Server is listening on port ${ this.config.port }`);
		});
	}
}
export default App;
