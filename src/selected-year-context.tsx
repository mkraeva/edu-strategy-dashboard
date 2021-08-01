import { createContext } from "react";

type SelectedYearContextType = {
  selectedYear: number;
  availableYears: number[];
  setSelectedYear: (x: number) => void;
};

const SelectedYearContext = createContext({
  selectedYear: 0,
  availableYears: [],
  setSelectedYear: (x: number) => {},
} as SelectedYearContextType);
export default SelectedYearContext;
