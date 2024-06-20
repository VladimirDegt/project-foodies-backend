import { connectDb } from "./db/connectDb.js";
import app from "./app.js";

export const startServer = async () => {
  await connectDb();
  const { PORT } = process.env;
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
};

startServer();
