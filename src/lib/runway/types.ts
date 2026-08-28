// Shape of the cash-runway model. One document, edited by Asad and Taha.

export type Row = {
  name: string;
  note: string;
  v: number[]; // one figure per month, aligned to `months`
};

export type Group = {
  name: string;
  kind: "income" | "expense";
  rows: Row[];
};

export type Levers = {
  inc: number;  // income scale, percent
  exp: number;  // expense scale, percent
  stop: number; // 0 = never; otherwise income stops from this 1-based month
};

export type RunwayModel = {
  seedVersion: string;
  startCash: number;
  months: string[];
  groups: Group[];
  levers: Levers;
};

export type Computed = {
  income: number[];
  spend: number[];
  net: number[];
  bal: number[];
  rawIncome: number[];
  rawSpend: number[];
};
