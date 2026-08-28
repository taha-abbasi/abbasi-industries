import { MongoClient, type Collection, type Db, type Document as MongoDocument } from "mongodb";

// ─────────────────────────────────────────────────────────────────────────────
// MongoDB connection — serverless-safe singleton, same shape as Startfest.
//
// Scoped to ONE database and a dedicated collection prefix so this app can
// never read or write anything else that shares the cluster.
// ─────────────────────────────────────────────────────────────────────────────

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "abbasi";
const PREFIX = process.env.MONGODB_COLLECTION_PREFIX ?? "runway_";

const options = { maxPoolSize: 4, serverSelectionTimeoutMS: 8000 };

declare global {
  // eslint-disable-next-line no-var
  var _runwayMongoClientPromise: Promise<MongoClient> | undefined;
}

function clientPromise(): Promise<MongoClient> {
  if (!uri) throw new Error("MONGODB_URI is not configured.");
  if (!global._runwayMongoClientPromise) {
    global._runwayMongoClientPromise = new MongoClient(uri, options).connect();
  }
  return global._runwayMongoClientPromise;
}

export async function db(): Promise<Db> {
  return (await clientPromise()).db(dbName);
}

export async function collection<T extends MongoDocument = MongoDocument>(name: string): Promise<Collection<T>> {
  return (await db()).collection<T>(PREFIX + name);
}

export const hasDb = () => Boolean(uri);
