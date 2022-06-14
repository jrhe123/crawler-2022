import "reflect-metadata";
import { Connection, getConnection, createConnection } from "typeorm";
//
import { User } from "../entity";

let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        console.error("db connection error: ", error);
      }

      const connection = await createConnection({
        name: "default",
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "medical",
        entities: [User],
        synchronize: false,
        logging: true,
      });
      return connection;
    })();
  }
  return connectionReadyPromise;
};
