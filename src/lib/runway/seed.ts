import type { RunwayModel } from "./types";

export const SEED_VERSION = "2026-08-28c";

// Seeded from the "Aug 26" tab of Budgeting — Monthly — AI.xlsx, then amended
// on the 2026-08-27 call: IVF moved to January, payoffs slid one month,
// opening cash $4,000, Buffer $5,000, ATT and Jackery removed.
export const SEED: RunwayModel = {
  seedVersion: SEED_VERSION,
  startCash: 4000,
  levers: { inc: 100, exp: 100, stop: 0 },
  hiddenMonths: [],
  months: ["Aug 2026","Sep 2026","Oct 2026","Nov 2026","Dec 2026","Jan 2027",
           "Feb 2027","Mar 2027","Apr 2027","May 2027","Jun 2027","Jul 2027"],
  groups: [
    { name:"Income", kind:"income", rows:[
      { name:"Salary",            note:"",   v:[0,30000,30000,30000,30000,30000,30000,30000,30000,30000,30000,30000] },
      { name:"Contractor Income", note:"",   v:[7500,0,0,0,0,0,0,0,0,0,0,0] },
      { name:"Bonus",             note:"",   v:[50000,0,0,0,35000,27000,0,0,27000,0,0,0] },
      { name:"Other",             note:"",  v:[0,10000,0,0,0,0,0,0,0,0,0,0] }
    ]},
    { name:"Debt & credit", kind:"expense", rows:[
      { name:"MACU",                  note:"Sep payoff (was Aug)",  v:[0,1933.31,0,0,0,0,0,0,0,0,0,0] },
      { name:"Apple Card - Nichell",  note:"Dec payoff (was Nov)",  v:[0,1000,1000,1000,12500,0,0,0,0,0,0,0] },
      { name:"Apple Card - Taha",     note:"Nov payoff (was Oct)",  v:[0,1000,1000,18500,0,0,0,0,0,0,0,0] },
      { name:"Wells Fargo - Taha",    note:"Sep payoff (was Aug)",  v:[0,1000,0,0,0,0,0,0,0,0,0,0] },
      { name:"Capital One - Nichell", note:"Jan payoff (was Dec)",  v:[0,1000,1000,1000,1000,42500,0,0,0,0,0,0] },
      { name:"Aqua Finance - Windows", note:"Oct payoff (was Sep)",  v:[657.48,657.48,20725,0,0,0,0,0,0,0,0,0] },
      { name:"GreenSky",              note:"Aug paid",            v:[0,107.22,107.22,107.22,107.22,107.22,107.22,107.22,107.22,107.22,107.22,107.22] },
      { name:"RC Willey",             note:"Dec payoff (was Nov)",  v:[0,219,219,219,7200,0,0,0,0,0,0,0] },
      { name:"Car Loan - Tesla",      note:"Aug paid",            v:[0,280.78,280.78,280.78,280.78,280.78,280.78,280.78,280.78,280.78,280.78,280.78] },
      { name:"Klarna",                note:"Sep payoff (was Aug)",  v:[0,2000,0,0,0,0,0,0,0,0,0,0] },
      { name:"Affirm",                note:"Sep paid in full (was Aug)",  v:[909,11500,0,0,0,0,0,0,0,0,0,0] },
      { name:"BestBuy Credit Card",   note:"Nov payoff (was Oct)",  v:[0,133.74,133.74,4000,0,0,0,0,0,0,0,0] },
      { name:"Care Credit",           note:"",                    v:[65,65,65,65,65,65,65,65,65,65,65,65] },
      { name:"Chase",                 note:"Oct payoff (was Sep)",  v:[60,60,2500,0,0,0,0,0,0,0,0,0] }
    ]},
    { name:"Home & utilities", kind:"expense", rows:[
      { name:"Mortgage Payment Amaryllis", note:"Aug paid",  v:[0,2025.73,2025.73,2025.73,2025.73,2025.73,2025.73,2025.73,2025.73,2025.73,2025.73,2025.73] },
      { name:"Heloc",                      note:"Aug paid",  v:[0,440.63,440.63,440.63,440.63,440.63,440.63,440.63,440.63,440.63,440.63,440.63] },
      { name:"Mortgage",                   note:"placeholder",  v:[0,0,0,0,0,0,0,0,0,0,0,0] },
      { name:"Rocky Power - Amaryllis",    note:"Aug paid",  v:[0,261.38,261.38,261.38,261.38,261.38,261.38,261.38,261.38,261.38,261.38,261.38] },
      { name:"Enbridge",                   note:"Aug paid",  v:[0,19.07,19.07,19.07,19.07,19.07,19.07,19.07,19.07,19.07,19.07,19.07] },
      { name:"White City Water",           note:"",  v:[65,65,65,65,65,65,65,65,65,65,65,65] },
      { name:"Sandy Suburban",             note:"",  v:[15.04,15.04,15.04,15.04,15.04,15.04,15.04,15.04,15.04,15.04,15.04,15.04] },
      { name:"Wasatch Front waste (trash & recycling)", note:"",  v:[26,26,26,26,26,26,26,26,26,26,26,26] },
      { name:"Google Fiber",               note:"Aug paid",  v:[0,71.40,71.40,71.40,71.40,71.40,71.4,71.4,71.4,71.4,71.4,71.4] },
      { name:"AT&T",                       note:"",  v:[311,290,290,290,290,290,290,290,290,290,290,290] }
    ]},
    { name:"Living & insurance", kind:"expense", rows:[
      { name:"Life Insurance",     note:"",  v:[117.63,117.63,117.63,117.63,117.63,117.63,117.63,117.63,117.63,117.63,117.63,117.63] },
      { name:"Dental",             note:"",  v:[50,50,50,50,50,50,50,50,50,50,50,50] },
      { name:"Car Insurance Geico", note:"",  v:[0,0,0,0,0,0,0,0,0,0,0,0] },
      { name:"Geico",              note:"",  v:[0,0,0,0,0,0,0,0,0,0,0,0] },
      { name:"IVF",                note:"Jan cycle (was Aug)",  v:[0,0,0,0,0,25000,0,0,0,0,0,0] },
      { name:"Personal Training/Gym Membership", note:"",  v:[0,0,0,0,0,0,0,0,0,0,0,0] },
      { name:"Personal Care (Nichell)", note:"",  v:[0,0,0,0,0,0,0,0,0,0,0,0] },
      { name:"Savings",            note:"",  v:[0,0,0,0,0,0,0,0,0,0,0,0] }
    ]},
    { name:"Business & one-offs", kind:"expense", rows:[
      { name:"AskFlorence",      note:"",  v:[1900,1900,1900,1900,1900,1900,1900,1900,1900,1900,1900,1900] },
      { name:"Operations",       note:"",  v:[5000,0,0,0,0,0,0,0,0,0,0,0] },
      { name:"Buffer",           note:"revised down from 15,000",  v:[5000,0,0,0,0,0,0,0,0,0,0,0] },
      { name:"Dirt Bikes",       note:"",  v:[20000,0,0,0,0,0,0,0,0,0,0,0] },
      { name:"Monthly Expenses", note:"placeholder",  v:[0,0,0,0,0,0,0,0,0,0,0,0] }
    ]}
  ]
};
