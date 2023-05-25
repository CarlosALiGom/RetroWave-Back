import "./loadEnviroments.js";
import createDebug from "debug";
import chalk from "chalk";
import app from "./server/app.js";
import connectToDatabase from "./database/connectToDatabase.js";

const debug = createDebug("retroWave-api:root");

const port = process.env.PORT ?? 4000;
const mongoDbConnection = process.env.MONGODB_CONNECTION;

if (!mongoDbConnection) {
  debug(chalk.red("Missing enviroment variables. Exiting..."));
  process.exit(1);
}

const localhost = `http:localhost:${port}`;

app.listen(port, () => {
  debug(`Listening on ${chalk.green(localhost)}`);
});

try {
  await connectToDatabase(mongoDbConnection);

  debug(chalk.blue("Connected to database"));
} catch (error: unknown) {
  debug(`Error connecting to database: ${chalk.red((error as Error).message)}`);
}
