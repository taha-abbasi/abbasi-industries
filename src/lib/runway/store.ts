import { collection, hasDb } from "./db";
import { normalise, clone, SEED } from "./model";
import type { RunwayModel } from "./types";

const DOC_ID = "household";

type ModelDoc = { _id: string; model: RunwayModel; updatedAt: Date };

/**
 * The model lives in one document so both viewers see the same figures.
 * Without a database configured we fall back to the seed — the page still
 * works, it just cannot remember edits.
 */
export async function loadModel(): Promise<{ model: RunwayModel; persisted: boolean }> {
  if (!hasDb()) return { model: clone(SEED), persisted: false };
  const col = await collection<ModelDoc>("models");
  const doc = await col.findOne({ _id: DOC_ID });
  if (!doc) return { model: clone(SEED), persisted: true };
  return { model: normalise(doc.model), persisted: true };
}

export async function saveModel(input: unknown): Promise<RunwayModel> {
  const model = normalise(input as Partial<RunwayModel>);
  if (!hasDb()) return model;
  const col = await collection<ModelDoc>("models");
  await col.updateOne(
    { _id: DOC_ID },
    { $set: { model, updatedAt: new Date() } },
    { upsert: true }
  );
  return model;
}
