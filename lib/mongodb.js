import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB URI not provided");
}

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export default class MongoDB {
  static #client = null;

  static getClientPromise() {
    if (this.#client === null) {
      this.#client = new MongoClient(uri, options);
    }

    return this.#client.connect();
  }

  static getDatabase() {
    if (this.#client === null) {
      this.#client = new MongoClient(uri, options);
    }

    return this.#client.db();
  }
}