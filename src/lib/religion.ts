// religion.ts

import { FaMoon, FaCross, FaOm, FaStarOfDavid } from "react-icons/fa";

// Define a type for Religion
export type Religion = {
  name: string;
  icon: React.ElementType;
  colorClass: string;
};

export const religions: Religion[] = [
  {
    name: "Islam",
    icon: FaMoon,
    colorClass: "text-blue-500 dark:text-blue-400",
  },
  {
    name: "Christianity",
    icon: FaCross,
    colorClass: "text-red-500 dark:text-red-400",
  },
  {
    name: "Hinduism",
    icon: FaOm,
    colorClass: "text-orange-500 dark:text-orange-400",
  },
  {
    name: "Judaism",
    icon: FaStarOfDavid,
    colorClass: "text-yellow-500 dark:text-yellow-400",
  },
];
