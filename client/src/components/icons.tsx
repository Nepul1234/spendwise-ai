import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const Icon = ({ size = 16, children, ...rest }: IconProps) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth={1.5}
    strokeLinecap="round" strokeLinejoin="round"
    className="ico" {...rest}
  >
    {children}
  </svg>
);

export const Home    = (p: IconProps) => <Icon {...p}><path d="M3 12l9-9 9 9M5 10v10h14V10" /></Icon>;
export const List    = (p: IconProps) => <Icon {...p}><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></Icon>;
export const Plus    = (p: IconProps) => <Icon {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>;
export const Stars   = (p: IconProps) => <Icon {...p}><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/></Icon>;
export const Calendar= (p: IconProps) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></Icon>;
export const CalendarMonth = (p: IconProps) => <Icon {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/><circle cx="8" cy="15" r="1" fill="currentColor"/><circle cx="12" cy="15" r="1" fill="currentColor"/><circle cx="16" cy="15" r="1" fill="currentColor"/></Icon>;
export const Wallet  = (p: IconProps) => <Icon {...p}><path d="M3 7a2 2 0 012-2h12v4H5a2 2 0 01-2-2z"/><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2v-8H5a2 2 0 01-2-2"/><circle cx="17" cy="14" r="1.2" fill="currentColor"/></Icon>;
export const Search  = (p: IconProps) => <Icon {...p}><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></Icon>;
export const Trash   = (p: IconProps) => <Icon {...p}><path d="M4 7h16M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13"/></Icon>;
export const Edit    = (p: IconProps) => <Icon {...p}><path d="M11 4H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-6"/><path d="M18 2l4 4-11 11H7v-4z"/></Icon>;
export const Logout  = (p: IconProps) => <Icon {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Icon>;
export const Settings= (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></Icon>;
export const ArrowUp = (p: IconProps) => <Icon {...p}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></Icon>;
export const ArrowDown=(p: IconProps) => <Icon {...p}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></Icon>;
export const ArrowRight=(p:IconProps) => <Icon {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Icon>;
export const ArrowLeftRight=(p:IconProps)=><Icon {...p}><polyline points="7 8 3 12 7 16"/><line x1="3" y1="12" x2="15" y2="12"/><polyline points="17 8 21 12 17 16"/><line x1="9" y1="12" x2="21" y2="12"/></Icon>;
export const Send    = (p: IconProps) => <Icon {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></Icon>;
export const Check   = (p: IconProps) => <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>;
export const Close   = (p: IconProps) => <Icon {...p}><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></Icon>;
export const Filter  = (p: IconProps) => <Icon {...p}><polygon points="22 3 2 3 10 12.5 10 19 14 21 14 12.5 22 3"/></Icon>;
export const Download= (p: IconProps) => <Icon {...p}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>;
export const Eye     = (p: IconProps) => <Icon {...p}><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></Icon>;
export const EyeOff  = (p: IconProps) => <Icon {...p}><path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a18 18 0 014.06-5"/><path d="M9.9 4.24A11 11 0 0112 4c7 0 11 7 11 7a18 18 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></Icon>;
export const Card    = (p: IconProps) => <Icon {...p}><rect x="3" y="6" width="18" height="13" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></Icon>;
export const Cash    = (p: IconProps) => <Icon {...p}><rect x="2" y="7" width="20" height="10" rx="1"/><circle cx="12" cy="12" r="2.2"/></Icon>;
export const Bank    = (p: IconProps) => <Icon {...p}><polygon points="12 3 22 8 2 8 12 3"/><line x1="4" y1="10" x2="4" y2="18"/><line x1="9" y1="10" x2="9" y2="18"/><line x1="15" y1="10" x2="15" y2="18"/><line x1="20" y1="10" x2="20" y2="18"/><line x1="2" y1="21" x2="22" y2="21"/></Icon>;
export const Phone   = (p: IconProps) => <Icon {...p}><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="10" y1="18" x2="14" y2="18"/></Icon>;
export const Bell    = (p: IconProps) => <Icon {...p}><path d="M18 16v-5a6 6 0 10-12 0v5l-2 3h16z"/><path d="M10 21a2 2 0 004 0"/></Icon>;
export const Cart    = (p: IconProps) => <Icon {...p}><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.7 12.6a1.5 1.5 0 001.5 1.2h8.2a1.5 1.5 0 001.5-1.1L21 7H6.4"/></Icon>;
export const Coffee  = (p: IconProps) => <Icon {...p}><path d="M4 8h13v6a4 4 0 01-4 4H8a4 4 0 01-4-4V8z"/><path d="M17 9h2a2 2 0 010 4h-2"/><line x1="6" y1="2" x2="6" y2="5"/><line x1="10" y1="2" x2="10" y2="5"/><line x1="14" y1="2" x2="14" y2="5"/></Icon>;
export const Car     = (p: IconProps) => <Icon {...p}><path d="M5 14l1.5-4.5a2 2 0 011.9-1.3h7.2a2 2 0 011.9 1.3L19 14"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><circle cx="7.5" cy="20" r="1.2" fill="currentColor"/><circle cx="16.5" cy="20" r="1.2" fill="currentColor"/></Icon>;
export const Home2   = (p: IconProps) => <Icon {...p}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></Icon>;
export const Bolt    = (p: IconProps) => <Icon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>;
export const Film    = (p: IconProps) => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="7" y1="3" x2="7" y2="21"/><line x1="17" y1="3" x2="17" y2="21"/><line x1="3" y1="9" x2="7" y2="9"/><line x1="17" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="7" y2="15"/><line x1="17" y1="15" x2="21" y2="15"/></Icon>;
export const Heart   = (p: IconProps) => <Icon {...p}><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></Icon>;
export const TrendUp = (p: IconProps) => <Icon {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></Icon>;
export const TrendDown=(p:IconProps) => <Icon {...p}><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></Icon>;
export const Menu    = (p: IconProps) => <Icon {...p}><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></Icon>;
export const Mail    = (p: IconProps) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></Icon>;
export const Lock    = (p: IconProps) => <Icon {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></Icon>;
export const User    = (p: IconProps) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></Icon>;
export const AlertCircle=(p:IconProps)=><Icon {...p}><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16" r="0.8" fill="currentColor" stroke="none"/></Icon>;
export const Flat    = (p: IconProps) => <Icon {...p}><line x1="5" y1="12" x2="19" y2="12"/></Icon>;
export const Tag     = (p: IconProps) => <Icon {...p}><path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor"/></Icon>;
export const Refresh = (p: IconProps) => <Icon {...p}><polyline points="3 12 6 9 9 12"/><path d="M21 12a9 9 0 01-15.5 6.3"/><polyline points="21 12 18 15 15 12"/><path d="M3 12a9 9 0 0115.5-6.3"/></Icon>;

export function categoryIcon(catIdOrName: string) {
  const n = catIdOrName.toLowerCase();
  if (n === 'groceries' || n.includes('grocer') || n.includes('supermarket')) return Cart;
  if (n === 'food'      || n.includes('food') || n.includes('drink') || n.includes('cafe') || n.includes('restaurant')) return Coffee;
  if (n === 'transport' || n.includes('transport') || n.includes('ride') || n.includes('travel')) return Car;
  if (n === 'rent'      || n.includes('rent') || n.includes('housing')) return Home2;
  if (n === 'utilities' || n.includes('util') || n.includes('electric') || n.includes('bill')) return Bolt;
  if (n === 'shopping'  || n.includes('shop') || n.includes('cloth')) return Cart;
  if (n === 'health'    || n.includes('health') || n.includes('medical') || n.includes('pharma')) return Heart;
  if (n === 'entertainment' || n.includes('entertain') || n.includes('movie') || n.includes('cinema')) return Film;
  if (n === 'salary'    || n.includes('salary') || n.includes('payroll')) return Bank;
  if (n === 'freelance' || n.includes('freelance') || n.includes('payout')) return Wallet;
  if (n === 'transfer'  || n.includes('transfer')) return ArrowLeftRight;
  return Tag;
}
