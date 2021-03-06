import { uniqBy } from "lodash";
import { PlotData } from "plotly.js";
import { useState } from "react";
import { Plot } from "../../lib/util";
import { IndicatorData } from "../../services/data";
import { getAreaTheme } from '../../themes';
import { CHART_CONFIG } from "./common.styles";
import "./indicator-chart.css";

interface IndicatorChartProps {
  records: IndicatorData[];
}

const IndicatorBoard = ({
  records
}: IndicatorChartProps) => {
  const currentYear = new Date().getFullYear();
  const year = Math.max(...records.map((d) => d.year).filter((y) => y <= currentYear));
  const value = records?.find((d) => d.year === year)?.value;
  const euAverage = records?.find((d) => d.year === year)?.euAverage;

  const targetRecord = records?.find((d) => d.isTarget);
  const targetYear = targetRecord?.year;
  const targetValue = targetRecord?.value;

  const color = getAreaTheme(records[0]?.area)?.primaryColor;

  return (
    <div className="indicator-main-area">
      <div>
        <p className="indicator-current-value" style={{color: color}}>{value}</p>
        През {year} г.
        {euAverage &&
          <>
            <p className="indicator-current-eu">{euAverage}</p>
            Средно за ЕС
          </>
        }
      </div>
      <div>
        {targetValue &&
          <>
            <p className="indicator-target-value">{targetValue}</p>
            Цел за {targetYear} г.
          </>
        }
      </div>
    </div>
  );
}

const IndicatorChart = ({
  records
}: IndicatorChartProps) => {
  const historic = records.filter(d => !d.isTarget);
  const years = historic.map((d) => d.year);
  const values = historic.map((d) => d.value);
  const euAverage = historic.map((d) => d.euAverage);

  const targets = records.filter(d => d.isTarget);
  const targetYears = targets.map((d) => d.year);
  const targetValues = targets.map((d) => d.value);

  const plotData: Partial<PlotData>[] = [
    {
      x: years,
      y: values,
      mode: "lines+markers",
      name: "България",
      line: {
        color: "#636EFA",
      },
      hoverinfo: "y",
    },
    {
      x: years,
      y: euAverage,
      mode: "lines+markers",
      name: "Средно за ЕС",
      line: {
        color: "#EF553B",
      },
      hoverinfo: "y",
    },
    {
      x: targetYears,
      y: targetValues,
      mode: "lines+markers",
      name: `Целева стойност ${targetYears[0]}`,
      hoverinfo: "y",
      marker: {
        size: 15
      },
      line: {
        color: "#27C42C"
      },
    }
  ];

  const plotLayout: Partial<Plotly.Layout> = {
    width: window.innerWidth > 480 ? 680 : 400,
    height: 400,
    grid: {
      rows: 10,
    },
    yaxis: {
      // title: "Стойност",
      // range: [0, 100],
      // tickvals: range(0, 100, 10),
    },
    xaxis: {
      // title: "Година",
      tickvals: years.concat(targetYears),
      automargin: true,
    },
    // hovermode: "y",
    legend: {
      orientation: "h",
      yanchor: "top",
      y: -0.2,
      xanchor: "left",
      x: -0.2
    },
    margin: {
      t: 20,
      l: 0,
    },
    dragmode: false,
  };

  return (
    <>
      <Plot
        data={plotData}
        layout={plotLayout}
        config={CHART_CONFIG}
      />
    </>
  );
};

interface IndicatorListElementProps {
  name: string;
  setSelected: (x: string) => void;
  isSelected: boolean;
  color: string;
}

const IndicatorListElement = ({
  name,
  setSelected,
  isSelected,
  color
}: IndicatorListElementProps) => {
  return (
    <div
      className={
        isSelected ? "indicator-list-element-active" : "indicator-list-element"
      }
    >
      <div className="indicator-list-ribbon" style={{backgroundColor: `${color}`}}></div>
      <p className="indicator-name" onClick={() => setSelected(name)}>
        {name}
      </p>
    </div>
  );
};

interface IndicatorChartSelectorProps {
  indicatorData: IndicatorData[];
  mainArea: boolean;
}

const IndicatorChartSelector = ({
  indicatorData,
  mainArea,
}: IndicatorChartSelectorProps) => {
  const indicators = uniqBy(indicatorData, 'name').sort((a, b) => {
    if (a.area === b.area) return a.name.localeCompare(b.name);
    else return a.area.localeCompare(b.area);
  });
  const [selected, setSelected] = useState("");
  if (indicators.length && !selected) {
    setSelected(indicators[0].name);
  }
  const selectedItem = indicatorData.find((x) => x.name === selected);

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
  const records = indicatorData.filter((d) => d.name === selected);

  if (!records.length) {
    return (
        <div>
          <h2 className="chart-title">{title}</h2>
          <div className="indicator-chart-container">
            <div className="no-indicators">
              <strong>&#x26A0;</strong> За тази приоритетна област все още няма данни за ключови индикатори.
            </div>
          </div>
        </div>
    );
  }

  const presentation = mainArea ?
    (
      <>
        <div className="indicator-priority-area">
          Приоритетна област<br/>
          <strong>{selectedItem?.area}</strong>
        </div>
        <IndicatorBoard
          records={records}
        />
      </>
    ) :
    (
      <IndicatorChart
        records={records}
      />
    );

  return (
    <div>
      <h2 className="chart-title">{title}</h2>
      <div className="indicator-chart-container">
        <div className="indicator-list">
          {indicators.map((i) => (
            <IndicatorListElement
              key={i.name}
              name={i.name}
              color={getAreaTheme(i.area).primaryColor}
              setSelected={setSelected}
              isSelected={selected === i.name}
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
