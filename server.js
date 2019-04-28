import express from "express";
import bodyParser from "body-parser";
import route from "./index";
import connection from "./config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3344 || process.env.PORT;

connection.connect();

route(app, connection);

app.listen(3344, () => {
  console.log("App listening on ", port);
});

export default app;
