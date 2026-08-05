/**
 * Prototype dataset — realistic Uttar Pradesh Development Authority sample data.
 * Pure client-side mock data for a presentation prototype (no backend).
 */

export type Status = "Active" | "Inactive";

export interface Scheme {
  id: string;
  code: string;
  name: string;
  authority: string;
  location: string;
  totalPlots: number;
  allotted: number;
  status: Status;
  launchYear: number;
}

export interface Plot {
  id: string;
  schemeCode: string;
  plotNo: string;
  sector: string;
  category: "Residential" | "Commercial" | "Institutional" | "Group Housing";
  area: number;
  roadWidth: number;
  corner: boolean;
  status: "Vacant" | "Allotted";
  allotteeId?: string;
}

export interface Allottee {
  id: string;
  name: string;
  fatherName: string;
  mobile: string;
  email: string;
  address: string;
  aadhaar: string;
  pan: string;
  occupation: string;
  schemeCode: string;
  plotNo: string;
  area: number;
  allotmentDate: string;
  possessionDate: string;
  chargeStartDate: string;
  status: "Active" | "Suspended" | "Cancelled";
}

export interface Rate {
  id: string;
  effectiveFrom: string;
  ratePerSqm: number;
  remarks: string;
  status: Status;
}

export interface Bill {
  id: string;
  billNo: string;
  schemeCode: string;
  plotNo: string;
  allottee: string;
  month: string;
  year: number;
  area: number;
  rateUsed: number;
  monthlyCharge: number;
  arrear: number;
  currentDue: number;
  totalDue: number;
  status: "Paid" | "Unpaid" | "Partially Paid" | "Overdue";
  generatedOn: string;
}

export interface Payment {
  id: string;
  receiptNo: string;
  billNo: string;
  allottee: string;
  schemeCode: string;
  plotNo: string;
  date: string;
  amount: number;
  mode: "UPI" | "Net Banking" | "Credit Card" | "Debit Card";
  txnId: string;
  status: "Success" | "Failed" | "Pending";
}

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AUTHORITIES = [
  "Noida Authority",
  "Ghaziabad Development Authority",
  "Lucknow Development Authority",
  "Kanpur Development Authority",
  "Agra Development Authority",
  "Varanasi Development Authority",
  "Prayagraj Development Authority",
  "Meerut Development Authority",
];

export const schemes: Scheme[] = [
  { id: "s1", code: "NDA/SEC-62/RES", name: "Sector 62 Residential Scheme", authority: "Noida Authority", location: "Sector 62, Noida", totalPlots: 1240, allotted: 1108, status: "Active", launchYear: 2011 },
  { id: "s2", code: "NDA/SEC-137/GH", name: "Sector 137 Group Housing Scheme", authority: "Noida Authority", location: "Sector 137, Noida", totalPlots: 860, allotted: 704, status: "Active", launchYear: 2014 },
  { id: "s3", code: "GDA/IND-PRM/RES", name: "Indirapuram Pratap Vihar Yojana", authority: "Ghaziabad Development Authority", location: "Indirapuram, Ghaziabad", totalPlots: 1520, allotted: 1391, status: "Active", launchYear: 2009 },
  { id: "s4", code: "GDA/MDN/RES", name: "Madhuban Bapudham Awas Yojana", authority: "Ghaziabad Development Authority", location: "Madhuban Bapudham, Ghaziabad", totalPlots: 2140, allotted: 1602, status: "Active", launchYear: 2016 },
  { id: "s5", code: "LDA/GOMTI/RES", name: "Gomti Nagar Vistar Yojana", authority: "Lucknow Development Authority", location: "Gomti Nagar Vistar, Lucknow", totalPlots: 1980, allotted: 1743, status: "Active", launchYear: 2012 },
  { id: "s6", code: "LDA/KANHA/RES", name: "Kanha Upvan Awasiya Yojana", authority: "Lucknow Development Authority", location: "Sitapur Road, Lucknow", totalPlots: 720, allotted: 498, status: "Active", launchYear: 2019 },
  { id: "s7", code: "KDA/JAJMAU/COM", name: "Jajmau Commercial Complex Scheme", authority: "Kanpur Development Authority", location: "Jajmau, Kanpur", totalPlots: 340, allotted: 268, status: "Active", launchYear: 2015 },
  { id: "s8", code: "ADA/TAJ-NGR/RES", name: "Taj Nagari Phase-II Yojana", authority: "Agra Development Authority", location: "Taj Nagari, Agra", totalPlots: 1120, allotted: 902, status: "Active", launchYear: 2013 },
  { id: "s9", code: "VDA/SARNATH/RES", name: "Sarnath Awasiya Yojana", authority: "Varanasi Development Authority", location: "Sarnath, Varanasi", totalPlots: 640, allotted: 471, status: "Active", launchYear: 2018 },
  { id: "s10", code: "PDA/NAINI/RES", name: "Naini Extension Housing Scheme", authority: "Prayagraj Development Authority", location: "Naini, Prayagraj", totalPlots: 580, allotted: 389, status: "Inactive", launchYear: 2008 },
];

export const rates: Rate[] = [
  { id: "r1", effectiveFrom: "01-04-2021", ratePerSqm: 1.25, remarks: "Base rate notified vide Board Resolution 41/2021", status: "Inactive" },
  { id: "r2", effectiveFrom: "01-04-2022", ratePerSqm: 1.5, remarks: "Revision of 20% approved in 118th Board Meeting", status: "Inactive" },
  { id: "r3", effectiveFrom: "01-04-2023", ratePerSqm: 1.8, remarks: "Annual escalation as per Govt. Order 2231/UD-2023", status: "Inactive" },
  { id: "r4", effectiveFrom: "01-04-2024", ratePerSqm: 2.1, remarks: "Maintenance cost indexation, O&M committee approval", status: "Inactive" },
  { id: "r5", effectiveFrom: "01-04-2025", ratePerSqm: 2.4, remarks: "Current applicable rate for FY 2025-26", status: "Active" },
  { id: "r6", effectiveFrom: "01-04-2026", ratePerSqm: 2.75, remarks: "Proposed rate — pending Board ratification", status: "Inactive" },
];

const firstNames = ["Rajesh", "Sunita", "Anil", "Priya", "Vikram", "Meena", "Sanjay", "Kavita", "Deepak", "Neha", "Ashok", "Rekha", "Manoj", "Shalini", "Pramod", "Anita", "Ravindra", "Poonam", "Satish", "Geeta"];
const lastNames = ["Kumar Singh", "Sharma", "Verma", "Gupta", "Yadav", "Tripathi", "Mishra", "Agarwal", "Srivastava", "Chaudhary", "Pandey", "Dubey", "Rastogi", "Saxena", "Nigam"];
const occupations = ["Government Service", "Business", "Private Service", "Retired (Pensioner)", "Agriculture", "Professional (CA)", "Teacher", "Advocate", "Doctor", "Engineer"];
const sectors = ["A", "B", "C", "D", "E", "F"];
const categories: Plot["category"][] = ["Residential", "Residential", "Residential", "Commercial", "Institutional", "Group Housing"];
const areas = [72, 90, 112.5, 120, 162, 200, 240, 300, 360, 450, 500];

function seeded(i: number, mod: number) {
  return (i * 2654435761) % mod;
}

/** Deterministic pick from a non-empty array (index always in range). */
function pick<T>(arr: readonly T[], i: number): T {
  return arr[seeded(i, arr.length)] as T;
}

export const plots: Plot[] = Array.from({ length: 180 }, (_, i) => {
  const scheme = schemes[i % schemes.length] as Scheme;
  const allotted = seeded(i + 7, 10) > 2;
  return {
    id: `p${i + 1}`,
    schemeCode: scheme.code,
    plotNo: `${pick(sectors, i + 1)}-${100 + ((i * 7) % 480)}`,
    sector: `Sector ${1 + (seeded(i + 5, 24) % 24)}`,
    category: pick(categories, i + 2),
    area: pick(areas, i + 3),
    roadWidth: pick([9, 12, 18, 24, 30, 45], i + 4),
    corner: seeded(i + 9, 5) === 0,
    status: allotted ? "Allotted" : "Vacant",
    ...(allotted ? { allotteeId: `a${i + 1}` } : {}),
  } satisfies Plot;
});

export const allottees: Allottee[] = plots
  .filter((p) => p.status === "Allotted")
  .map((p, i) => {
    const fn = pick(firstNames, i + 1);
    const ln = pick(lastNames, i + 6);
    const scheme = schemes.find((s) => s.code === p.schemeCode) as Scheme;
    return {
      id: p.allotteeId as string,
      name: `${fn} ${ln}`,
      fatherName: `${pick(firstNames, i + 11)} ${ln}`,
      mobile: `9${(100000000 + seeded(i + 13, 899999999)).toString().slice(0, 9)}`,
      email: `${fn.toLowerCase()}.${(ln.split(" ")[0] as string).toLowerCase()}${i}@gmail.com`,
      address: `${p.plotNo}, ${p.sector}, ${scheme.location}`,
      aadhaar: `XXXX XXXX ${1000 + seeded(i + 17, 8999)}`,
      pan: `A${String.fromCharCode(65 + seeded(i, 26))}XPS${1000 + seeded(i + 19, 8999)}${String.fromCharCode(65 + seeded(i + 2, 26))}`,
      occupation: pick(occupations, i + 8),
      schemeCode: p.schemeCode,
      plotNo: p.plotNo,
      area: p.area,
      allotmentDate: `${1 + seeded(i + 21, 27)}-${String(1 + seeded(i + 3, 12)).padStart(2, "0")}-${2012 + seeded(i + 4, 11)}`,
      possessionDate: `${1 + seeded(i + 23, 27)}-${String(1 + seeded(i + 5, 12)).padStart(2, "0")}-${2014 + seeded(i + 6, 9)}`,
      chargeStartDate: `01-04-${2021 + seeded(i + 7, 4)}`,
      status: seeded(i + 29, 22) === 0 ? "Suspended" : "Active",
    } satisfies Allottee;
  });

const billStatuses: Bill["status"][] = ["Paid", "Paid", "Paid", "Unpaid", "Overdue", "Partially Paid"];

export const bills: Bill[] = allottees.slice(0, 120).map((a, i) => {
  const monthIdx = seeded(i + 2, 12);
  const year = 2026;
  const rateUsed = pick([1.8, 2.1, 2.4, 2.4, 2.4], i + 3);
  const monthlyCharge = +(a.area * rateUsed).toFixed(2);
  const arrear = +(monthlyCharge * seeded(i + 5, 7)).toFixed(2);
  const status = pick(billStatuses, i + 9);
  return {
    id: `b${i + 1}`,
    billNo: `UC/${year}/${String(10000 + i * 7).slice(0, 5)}`,
    schemeCode: a.schemeCode,
    plotNo: a.plotNo,
    allottee: a.name,
    month: MONTHS[monthIdx] as string,
    year,
    area: a.area,
    rateUsed,
    monthlyCharge,
    arrear: status === "Paid" ? 0 : arrear,
    currentDue: monthlyCharge,
    totalDue: status === "Paid" ? 0 : +(monthlyCharge + arrear).toFixed(2),
    status,
    generatedOn: `01-${String(monthIdx + 1).padStart(2, "0")}-${year}`,
  } satisfies Bill;
});

const modes: Payment["mode"][] = ["UPI", "Net Banking", "Credit Card", "Debit Card"];

export const payments: Payment[] = bills
  .filter((b) => b.status === "Paid" || b.status === "Partially Paid")
  .map((b, i) => ({
    id: `pay${i + 1}`,
    receiptNo: `RCPT/2026/${String(40000 + i * 13).slice(0, 5)}`,
    billNo: b.billNo,
    allottee: b.allottee,
    schemeCode: b.schemeCode,
    plotNo: b.plotNo,
    date: `${1 + seeded(i + 3, 27)}-${String(1 + seeded(i + 1, 12)).padStart(2, "0")}-2026`,
    amount: +(b.monthlyCharge + (b.status === "Partially Paid" ? 0 : b.arrear)).toFixed(2),
    mode: pick(modes, i + 7),
    txnId: `TXN${2026}${String(seeded(i + 11, 9999999)).padStart(7, "0")}`,
    status: (seeded(i + 31, 19) === 0 ? "Failed" : "Success") as Payment["status"],
  }));

/* ---------------- Aggregates ---------------- */

export const totals = {
  schemes: schemes.length,
  plots: schemes.reduce((s, x) => s + x.totalPlots, 0),
  allotted: schemes.reduce((s, x) => s + x.allotted, 0),
  get vacant() {
    return this.plots - this.allotted;
  },
  monthlyDemand: 41823500,
  collection: 33127800,
  outstanding: 8695700,
  arrear: 14382900,
  get recovery() {
    return +((this.collection / this.monthlyDemand) * 100).toFixed(1);
  },
};

export const monthlyTrend = [
  { month: "Apr", demand: 38.1, collection: 29.4, arrear: 12.2 },
  { month: "May", demand: 38.6, collection: 31.2, arrear: 12.9 },
  { month: "Jun", demand: 39.2, collection: 30.1, arrear: 13.4 },
  { month: "Jul", demand: 39.8, collection: 33.6, arrear: 13.1 },
  { month: "Aug", demand: 40.1, collection: 34.9, arrear: 12.6 },
  { month: "Sep", demand: 40.4, collection: 32.2, arrear: 13.2 },
  { month: "Oct", demand: 40.9, collection: 36.4, arrear: 12.4 },
  { month: "Nov", demand: 41.2, collection: 35.1, arrear: 12.9 },
  { month: "Dec", demand: 41.4, collection: 37.8, arrear: 11.8 },
  { month: "Jan", demand: 41.6, collection: 34.2, arrear: 13.6 },
  { month: "Feb", demand: 41.7, collection: 35.9, arrear: 13.9 },
  { month: "Mar", demand: 41.8, collection: 33.1, arrear: 14.4 },
];

const schemeFactors = [1.1, 0.95, 1.2, 0.9, 1.05, 0.8, 1.3, 1.0];
const schemeRecovery = [92.4, 84.1, 78.6, 61.2, 88.9, 46.8, 71.3, 55.4];

export const schemeWiseCollection = schemes.slice(0, 8).map((s, i) => {
  const demand = +(s.allotted * 0.0021 * (schemeFactors[i] as number)).toFixed(2);
  const recovery = schemeRecovery[i] as number;
  return {
    code: `${s.code.split("/")[0]} ${s.code.split("/")[1]}`,
    scheme: s.name,
    authority: s.authority,
    demand,
    collection: +((demand * recovery) / 100).toFixed(2),
    recovery,
  };
});


export const paymentStatusSplit = [
  { name: "Paid", value: 62, color: "var(--color-success)" },
  { name: "Partially Paid", value: 14, color: "var(--color-warning)" },
  { name: "Unpaid", value: 15, color: "var(--color-chart-2)" },
  { name: "Overdue", value: 9, color: "var(--color-destructive)" },
];

export const paymentModeSplit = [
  { name: "UPI", value: 48 },
  { name: "Net Banking", value: 26 },
  { name: "Debit Card", value: 15 },
  { name: "Credit Card", value: 11 },
];

export function recoveryBand(pct: number) {
  if (pct >= 85) return { label: "Excellent", tone: "success" as const };
  if (pct >= 70) return { label: "Average", tone: "warning" as const };
  if (pct >= 55) return { label: "Poor", tone: "saffron" as const };
  return { label: "Critical", tone: "destructive" as const };
}

export const inr = (n: number, opts: { compact?: boolean } = {}) => {
  if (opts.compact) {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  }
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
};

/* ---------- Logged-in allottee for the self-service portal ---------- */

export const currentAllottee = {
  name: "Rajesh Kumar Singh",
  allotteeCode: "LDA/ALT/2019/004821",
  fatherName: "Shri Ram Naresh Singh",
  mobile: "9415 8xx xx7",
  email: "rajesh.singh@gmail.com",
  aadhaar: "XXXX XXXX 4471",
  pan: "AKXPS4471C",
  occupation: "Government Service",
  address: "C-214, Sector 6, Gomti Nagar Vistar, Lucknow — 226010",
  scheme: "Gomti Nagar Vistar Yojana",
  schemeCode: "LDA/GOMTI/RES",
  plotNo: "C-214",
  sector: "Sector 6",
  area: 162,
  category: "Residential",
  allotmentDate: "18-07-2019",
  possessionDate: "02-11-2020",
  chargeStartDate: "01-04-2021",
  currentRate: 2.4,
  currentBill: 388.8,
  arrear: 1944,
  get totalDue() {
    return this.currentBill + this.arrear;
  },
};

export const allotteeArrearBreakup = [
  { period: "Apr 2025 – Jun 2025", months: 3, rate: 2.1, amount: 1020.6, status: "Unpaid" },
  { period: "Jul 2025 – Sep 2025", months: 3, rate: 2.4, amount: 1166.4, status: "Paid" },
  { period: "Oct 2025 – Dec 2025", months: 3, rate: 2.4, amount: 1166.4, status: "Paid" },
  { period: "Jan 2026 – Mar 2026", months: 3, rate: 2.4, amount: 1166.4, status: "Unpaid" },
];

export const allotteeBills = [
  { billNo: "UC/2026/10231", month: "March 2026", area: 162, rate: 2.4, amount: 388.8, arrear: 1944, total: 2332.8, status: "Unpaid" as const },
  { billNo: "UC/2026/10102", month: "February 2026", area: 162, rate: 2.4, amount: 388.8, arrear: 1555.2, total: 1944, status: "Unpaid" as const },
  { billNo: "UC/2026/09984", month: "January 2026", area: 162, rate: 2.4, amount: 388.8, arrear: 1166.4, total: 1555.2, status: "Unpaid" as const },
  { billNo: "UC/2025/09871", month: "December 2025", area: 162, rate: 2.4, amount: 388.8, arrear: 0, total: 388.8, status: "Paid" as const },
  { billNo: "UC/2025/09702", month: "November 2025", area: 162, rate: 2.4, amount: 388.8, arrear: 0, total: 388.8, status: "Paid" as const },
  { billNo: "UC/2025/09611", month: "October 2025", area: 162, rate: 2.1, amount: 340.2, arrear: 0, total: 340.2, status: "Paid" as const },
];

export const allotteePayments = [
  { receiptNo: "RCPT/2026/40218", date: "04-01-2026", amount: 388.8, txnId: "TXN2026884512", mode: "UPI", status: "Success" as const },
  { receiptNo: "RCPT/2025/39877", date: "06-12-2025", amount: 388.8, txnId: "TXN2025771203", mode: "Net Banking", status: "Success" as const },
  { receiptNo: "RCPT/2025/39104", date: "09-11-2025", amount: 340.2, txnId: "TXN2025664118", mode: "UPI", status: "Success" as const },
  { receiptNo: "RCPT/2025/38556", date: "11-10-2025", amount: 340.2, txnId: "TXN2025551094", mode: "Debit Card", status: "Failed" as const },
  { receiptNo: "RCPT/2025/38012", date: "08-09-2025", amount: 1020.6, txnId: "TXN2025447781", mode: "Credit Card", status: "Success" as const },
];

export const notifications = [
  { id: 1, type: "bill" as const, title: "Bill Generated for March 2026", body: "Monthly user charge bill UC/2026/10231 of ₹388.80 has been generated for Plot C-214.", time: "01 Mar 2026, 06:15 AM", unread: true },
  { id: 2, type: "arrear" as const, title: "Arrear Reminder", body: "Outstanding arrear of ₹1,944.00 pending since Apr 2025. Kindly clear to avoid 12% p.a. interest.", time: "28 Feb 2026, 10:00 AM", unread: true },
  { id: 3, type: "success" as const, title: "Payment Successful", body: "Payment of ₹388.80 received against bill UC/2025/09871. Receipt RCPT/2026/40218 available for download.", time: "04 Jan 2026, 07:42 PM", unread: false },
  { id: 4, type: "failed" as const, title: "Payment Failed", body: "Transaction TXN2025551094 of ₹340.20 failed at bank gateway. No amount was debited.", time: "11 Oct 2025, 03:18 PM", unread: false },
  { id: 5, type: "reminder" as const, title: "Reminder: Pending Bill", body: "Bill UC/2026/10102 for February 2026 is due. Last date to pay without late fee is 15 Mar 2026.", time: "05 Mar 2026, 09:00 AM", unread: false },
];

export const adminUsers = [
  { id: 1, name: "Anurag Mishra, IAS", designation: "Vice Chairman", authority: "Lucknow Development Authority", role: "Super Admin", email: "vc@ldalucknow.gov.in", lastLogin: "05 Aug 2026, 09:12 AM", status: "Active" as const },
  { id: 2, name: "Sudhir Kumar Rai", designation: "Secretary", authority: "Lucknow Development Authority", role: "Authority Admin", email: "secretary@ldalucknow.gov.in", lastLogin: "05 Aug 2026, 08:45 AM", status: "Active" as const },
  { id: 3, name: "Neelam Srivastava", designation: "Finance Controller", authority: "Noida Authority", role: "Finance Officer", email: "fc@noidaauthority.gov.in", lastLogin: "04 Aug 2026, 06:20 PM", status: "Active" as const },
  { id: 4, name: "Praveen Chaudhary", designation: "Assistant Engineer", authority: "Ghaziabad Development Authority", role: "Scheme Operator", email: "ae.scheme@gdaghaziabad.gov.in", lastLogin: "04 Aug 2026, 04:02 PM", status: "Active" as const },
  { id: 5, name: "Ritu Agarwal", designation: "Accounts Officer", authority: "Kanpur Development Authority", role: "Billing Clerk", email: "ao@kdakanpur.gov.in", lastLogin: "31 Jul 2026, 11:31 AM", status: "Inactive" as const },
  { id: 6, name: "Mohd. Arif Khan", designation: "Cashier", authority: "Agra Development Authority", role: "Collection Counter", email: "cashier@adaagra.gov.in", lastLogin: "05 Aug 2026, 07:58 AM", status: "Active" as const },
];

export const auditTrail = [
  { time: "05 Aug 2026, 09:41 AM", user: "Sudhir Kumar Rai", action: "Generated monthly demand for Aug 2026 — 9,076 bills", module: "Demand Generation" },
  { time: "05 Aug 2026, 09:12 AM", user: "Anurag Mishra, IAS", action: "Approved rate revision proposal ₹2.75/sq.m. (FY 2026-27)", module: "Rate Master" },
  { time: "04 Aug 2026, 06:20 PM", user: "Neelam Srivastava", action: "Exported Defaulter List (Noida Authority) to Excel", module: "Reports" },
  { time: "04 Aug 2026, 04:02 PM", user: "Praveen Chaudhary", action: "Allotted Plot D-318, Madhuban Bapudham to Sunita Sharma", module: "Plot Allotment" },
  { time: "04 Aug 2026, 12:36 PM", user: "Mohd. Arif Khan", action: "Recorded counter payment ₹4,860.00 — Receipt RCPT/2026/40711", module: "Payments" },
];
