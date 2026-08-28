export const fmt0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
export const fmt2 = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Money for headlines: rounded, with a real minus sign. */
export const money = (n: number) => (n < 0 ? "−" : "") + "$" + fmt0.format(Math.abs(Math.round(n)));

/** Ledger cell: an em dash reads better than a row of zeroes. */
export const cell = (n: number) => (n === 0 ? "—" : fmt2.format(n));

export const avgOf = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
export const pctToDollars = (pct: number, avg: number) => (pct / 100 - 1) * avg;
export const dollarsToPct = (d: number, avg: number) => (avg ? 100 + (d / avg) * 100 : 100);
