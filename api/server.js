import fs from "fs";
import express from "express";
import https from "https";
import { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";

const config = {
	port: 3001,
	ssl_key: `../certs/kiszka.key`,
	ssl_cert: `../certs/kiszka.crt`,
};

const app = express();

const key = fs.readFileSync("../certs/kiszka.key");
const cert = fs.readFileSync("../certs/kiszka.crt");

/**
 * This is a newer way to do the work commonly seen with `bodyParser`
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

/**
 * This activates CORS
 */
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);

	//? Whatever middleware work .next() is doing is ESSENTIAL to actually making this work
	return next();
});

/**
 * A basic middleware example
 */
app.use(function (req, res, next) {
	// console.log("middleware");
	// req.testing = "testing";

	return next();
});

/**
 * A basic routing example
 */
app.get("/", function (req, res, next) {
	// console.log("get route", req.testing);
	res.json({
		cats: 2,
		names: ["Buddha", "Kiszka"],
	});
});

//  Server creation starts here
const server = https.createServer({ key, cert }, app);

const wss = new WebSocketServer({ server });
wss.on("connection", client => {
	console.log("Client connected");

	client.uuid = uuid();
	client.send(JSON.stringify({
		uuid: client.uuid,
	}));

	client.on("message", data => {
		console.log(`Message received`, JSON.parse(data));
	});
	// client.onmessage = (msg) => {
	// 	console.log(msg.data);
	// 	// console.log(`Message received`, JSON.parse(msg));
	// };
});

server.listen(config.port, err => {
	if (err) {
		console.log("Well, this didn't work...");
		process.exit();
	}
	console.log(`Server is listening on port ${config.port}`);
});