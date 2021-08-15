import { range, uniq } from "lodash";
import { PlotData } from "plotly.js";
import { useState } from "react";
import { Plot } from "../../lib/util";
import { IndicatorData } from "../../services/data";
import "./indicator-chart.css";

interface IndicatorChartProps {
  indicatorData: IndicatorData[];
  selectedName: String;
}

const IndicatorBoard = ({
  indicatorData,
  selectedName,
}: IndicatorChartProps) => {
  const currentYear = new Date().getFullYear();
  const records = indicatorData.filter((d) => d.name === selectedName);
  const year = Math.max(...records.map((d) => d.year).filter((y) => y <= currentYear));
  const value = records?.find((d) => d.year === year)?.value;
  const euAverage = records?.find((d) => d.year === year)?.euAverage;

  return (
    <div className="indicator-main-area">
      <div>
        <p className="indicator-current-value">{value}</p>
        През {year} г.
        {euAverage &&
          <>
            <p className="indicator-current-eu">{euAverage}</p>
            Средно за ЕС
          </>
        }
      </div>
      <div>
        <p className="indicator-target-value">%</p>
        Цел за {""} г.
      </div>
    </div>
  );
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
    width: 680,
    height: 400,
    grid: {
      rows: 10,
    },
    yaxis: {
      title: "Проценти",
      range: [0, 100],
      tickvals: range(0, 100, 10),
    },
    xaxis: {
      title: "Година",
      tickvals: years,
    },
    hovermode: "y",
    legend: {
      orientation: "v",
    },
    margin: {
      t: 20,
    },
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
  mainArea: Boolean;
}

const IndicatorChartSelector = ({
  indicatorData,
  mainArea,
}: IndicatorChartSelectorProps) => {
  const indicatorNames = uniq(indicatorData.map((d) => d.name)).sort();
  const [selected, setSelected] = useState("");
  if (indicatorNames.length && !selected) {
    setSelected(indicatorNames[0]);
  }
  const selectedItem = indicatorData.find((x) => x.name === selected);
  // console.log(selectedItem);

  const sourceLinkElement = selectedItem?.sourceLink?.startsWith("http") ? (
    <p className="indicator-source-link">
      Източник:{" "}
      <a href={selectedItem?.sourceLink}>{selectedItem?.sourceLink}</a>
    </p>
  ) : (
    <p className="indicator-source-link">
      Източник: {selectedItem?.sourceLink}
    </p>
  );

  const title = mainArea ? "Ключови индикатори в стратегическата рамка и техните стойности" : "Движение на ключовите индикатори в приоритетната област";
  const presentation = mainArea ?
    (
      <IndicatorBoard
        indicatorData={indicatorData}
        selectedName={selected}
      />
    ) :
    (
      <IndicatorChart
        indicatorData={indicatorData}
        selectedName={selected}
      />
    );

  return (
    <div>
      <h2 className="chart-title">{title}</h2>
      <div className="indicator-chart-container">
        <div className="indicator-list">
          {indicatorNames.map((name) => (
            <IndicatorListElement
              key={name}
              name={name}
              setSelected={setSelected}
              isSelected={selected === name}
            />
          ))}
        </div>
        <div className="indicator-body">
          {presentation}
          <p className="indicator-source-link">
            {selectedItem?.publishingPeriod}
          </p>
          {sourceLinkElement}
        </div>
      </div>
    </div>
  );
};

export default IndicatorChartSelector;
