import { uniq } from "lodash";
import { PlotData } from "plotly.js";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { IndicatorData } from "../../services/data";
import "./indicator-chart.css";

interface IndicatorChartProps {
  indicatorData: IndicatorData[];
  selectedName: String;
}

const IndicatorChart = ({
  indicatorData,
  selectedName,
}: IndicatorChartProps) => {
  const records = indicatorData.filter((d) => d.name === selectedName);
  const years = records.map((d) => d.year);
  const values = records.map((d) => d.value);
  const euAverage = records.map((d) => d.euAverage);

  const plotData: Partial<PlotData>[] = [
    {
      x: years,
      y: values,
      mode: "lines+markers",
      name: "България",
      line: {
        color: "red",
      },
    },
    {
      x: years,
      y: euAverage,
      mode: "lines+markers",
      name: "Средно за ЕС",
      line: {
        color: "blue",
      },
    },
  ];

  const plotLayout: Partial<Plotly.Layout> = {
    width: 460,
    height: 480,
    yaxis: {
      range: [0, 100],
    },
    xaxis: {
      tickvals: years,
    },
    hovermode: "y",
  };

  return (
    <>
      <Plot
        data={plotData}
        layout={plotLayout}
        config={{ displayModeBar: false }}
      />
    </>
  );
};

interface IndicatorListElementProps {
  name: string;
  setSelected: (x: string) => void;
  isSelected: boolean;
}

const IndicatorListElement = ({
  name,
  setSelected,
  isSelected,
}: IndicatorListElementProps) => {
  return (
    <div
      className={
        isSelected ? "indicator-list-element-active" : "indicator-list-element"
      }
    >
      <p className="indicator-name" onClick={() => setSelected(name)}>
        {name}
      </p>
    </div>
  );
};

interface IndicatorChartSelectorProps {
  indicatorData: IndicatorData[];
}
const IndicatorChartSelector = ({
  indicatorData,
}: IndicatorChartSelectorProps) => {
  const indicatorNames = uniq(indicatorData.map((d) => d.name)).sort();
  const [selected, setSelected] = useState("");
  if (indicatorNames.length && !selected) {
    setSelected(indicatorNames[0]);
  }

  return (
    <div className="indicator-chart-container">
      <div>
        {indicatorNames.map((name) => (
          <IndicatorListElement
            key={name}
            name={name}
            setSelected={setSelected}
            isSelected={selected === name}
          />
        ))}
      </div>
      <IndicatorChart indicatorData={indicatorData} selectedName={selected} />
    </div>
  );
};

export default IndicatorChartSelector;
