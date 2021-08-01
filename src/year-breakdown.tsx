import Slider, { createSliderWithTooltip } from "rc-slider";
import { useContext } from "react";
import SelectedYearContext from "./selected-year-context";
import "rc-slider/assets/index.css";

const trackStyle: React.CSSProperties = {};
const handleStyle: React.CSSProperties = {
  background: "#0678A9 0% 0% no-repeat padding-box",
  boxShadow: "0px 3px 6px #00000029",
  borderColor: "#0678A9",
  borderRadius: 10,
  width: 20,
  height: 20,
  bottom: -2,
  marginLeft: 5,
};
const dotStyle: React.CSSProperties = {
  width: 20,
  height: 20,
  bottom: -8,
};
const railStyle: React.CSSProperties = {
  background: "#E4E4E4 0% 0% no-repeat padding-box",
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
        dots={true}
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
