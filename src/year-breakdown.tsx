import Slider, { createSliderWithTooltip } from "rc-slider";
import { useContext } from "react";
import SelectedYearContext from "./selected-year-context";
import "rc-slider/assets/index.css";
import "./slider.css";

const handleStyle: React.CSSProperties = {
  backgroundColor: "#0678A9",
  boxShadow: "0px 3px 6px #00000029",
  borderColor: "#0678A9",
  borderRadius: 10,
  width: 18,
  height: 18,
  bottom: -4,
  marginLeft: 5,
};
const dotStyle: React.CSSProperties = {
  visibility: "hidden",
};
const trackStyle: React.CSSProperties = {
  backgroundColor: "#BFBFBF",
  height: 8
};
const railStyle: React.CSSProperties = {
  background: "#E4E4E4",
  height: 8,
  borderRadius: 4,
};

const TooltipSlider = createSliderWithTooltip(Slider);

const YearBreakdown: React.FunctionComponent = () => {
  const selectedYear = useContext(SelectedYearContext);
  let marks: any = {};
  selectedYear.availableYears.forEach((i) => (marks[i] = { label: String(i) }));
  return (
    <>
      <TooltipSlider
        onChange={(v) => selectedYear.setSelectedYear(v)}
        defaultValue={
          selectedYear.availableYears[selectedYear.availableYears.length - 1]
        }
        min={selectedYear.availableYears.reduce(
          (x, y) => (x < y ? x : y),
          2500
        )}
        max={selectedYear.availableYears.reduce(
          (x, y) => (x > y ? x : y),
          1990
        )}
        value={selectedYear.selectedYear}
        dotStyle={dotStyle}
        marks={marks}
        trackStyle={trackStyle}
        handleStyle={handleStyle}
        railStyle={railStyle}
      />
      <div style={{ height: 20 }} />
    </>
  );
};

export default YearBreakdown;
