import app from "./app";
import "./config/env.config";

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running in http://localhost:${port}`)
);