// app/components/home/types.ts
export type ThemeColor = 
  | 'default' 
  | 'champagne' 
  | 'pearl' 
  | 'saffron' 
  | 'linen' 
  | 'royal' 
  | 'pure-gold' 
  | 'onyx';

export type LayoutType = 
  | 'rabat' 
  | 'minaret' 
  | 'ritual' 
  | 'kasbah' 
  | 'monolith';

export interface ColorOption {
  id: ThemeColor;
  bg: string;
  label: string;
}

export interface LayoutOption {
  id: LayoutType;
  label: string;
}

export const COLORS: ColorOption[] = [
  { id: "default", bg: "#fdfcf7", label: "Ivory" },
  { id: "champagne", bg: "#f9f5eb", label: "Champagne" },
  { id: "pearl", bg: "#f4f4f4", label: "Pearl" },
  { id: "saffron", bg: "#fffcf2", label: "Saffron" },
  { id: "linen", bg: "#ede9e1", label: "Linen" },
  { id: "royal", bg: "#ffffff", label: "Royal" },
  { id: "pure-gold", bg: "#e6c200", label: "Pure Gold" },
  { id: "onyx", bg: "#0f0f0f", label: "Onyx" },
];

export const LAYOUTS: LayoutOption[] = [
  { id: "rabat", label: "Rabat" },
  { id: "minaret", label: "The Minaret" },
  { id: "ritual", label: "The Oud Ritual" },
  { id: "kasbah", label: "The Kasbah" },
  { id: "monolith", label: "The Monolith" },
];

export const containerVars = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
};

export const itemVars = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};