import mongoose from "mongoose";
import { databaseConnection } from "./../config/databaseConnection.config";

mongoose.Promise = global.Promise;

mongoose
    .connect(
        databaseConnection.databaseURL,
        databaseConnection.connectionOptions
    )
    .then(() => console.log("Connected."))
    .catch((error) => console.log('String de conexão: ', process.env.DATABASE_URL));

export { mongoose };