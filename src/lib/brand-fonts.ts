import { Archivo, Public_Sans, Mrs_Saint_Delafield } from "next/font/google";

/* Realty's own type system (only loaded where the brand board renders) */
export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", preload: false, display: "swap" });
export const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans", preload: false, display: "swap" });
export const signature = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400", variable: "--font-signature", preload: false, display: "swap" });
