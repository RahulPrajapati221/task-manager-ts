import mongoose, { ConnectOptions } from "mongoose";

//Database connection
export const connectDB = () => {
  mongoose
    .connect(
      process.env.DB_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    )
    .then((data) =>
      console.log(`mongodb connected with server : ${data.connection.host}`)
    )
    .catch((e) => console.log(e));
};
