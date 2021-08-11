import { sortBy } from "lodash";
import React from "react";
import { useStyles } from "./components/priority-area/budget-source-chart.styles";
import { Plot } from "./lib/util";
import { ActivityData } from "./services/data";
import { generateShades, getAreaTheme } from "./themes";
import YearBreakdown from "./year-breakdown";

type ActivityBudgetChartProps = {
  activityData: ActivityData[];
};

const FixedColors = {
  nationalBudget: '#FAB316',
  externalBudget: '#0678A9'
};

const ActivityBudgetChart: React.FC<ActivityBudgetChartProps> = ({
  activityData,
}) => {
  activityData.sort((a, b) => (a.nationalBudget < b.nationalBudget ? 1 : -1));
  const classes = useStyles();
  const areaColor = activityData.length
    ? getAreaTheme(activityData[0].area).primaryColor
    : "#000000";
  const reordered = sortBy(
    activityData,
    (d) => -(d.externalBudget + d.nationalBudget)
  );
  const colors = generateShades(areaColor, reordered.length);
  return (
    <div className={classes.budgetSourceChartContainer}>
      <h2 className="chart-title">
        Разпределение на средствата по дейности в рамките на приоритетната област
      </h2>
      <p>Графиките показват разпределението на средствата по различните пера и дейности, финансирани в образователната система</p>
      <div className={classes.budgetSourceContainer}>
        <div className={classes.budgetSourceChartContainer}>
          <YearBreakdown />
          <Plot
            config={{ displayModeBar: false }}
            data={[
              {
                labels: reordered.map((d) => d.activity),
                values: reordered.map(
                  (d) => d.nationalBudget + d.externalBudget
                ),
                marker: {
                  colors: colors,
                },
                type: "pie",
                showlegend: false,
                textinfo: "none",
              },
            ]}
            layout={{ width: 460, height: 480 }}
          />
        </div>
        <div className={classes.budgetSourceLegend}>
          {reordered.map((activityData, idx) => (
            <div key={idx} className={classes.budgetSourceEntry}>
              <div
                className={classes.budgetSourceLogo}
                style={{
                  backgroundColor: colors[idx],
                }}
              />
              <div><p style={{marginTop: 0}}>{activityData.activity}</p>
                <Plot
                  config={{ displayModeBar: false }}
                  data={[
                    {
                      y: [activityData.activity],
                      x: [
                        (activityData.nationalBudget /
                          (activityData.nationalBudget +
                            activityData.externalBudget)) *
                          100,
                      ],
                      width: 0.25,
                      hoverinfo: "y",
                      marker: {
                        color: FixedColors.nationalBudget
                      },
                      type: "bar",
                      orientation: "h",
                      labels: [],
                      name: "Средства от националния бюджет (%)",
                    },
                    {
                      y: [activityData.activity],
                      x: [
                        (activityData.externalBudget /
                          (activityData.nationalBudget +
                            activityData.externalBudget)) *
                          100,
                      ],
                      width: 0.25,
                      hoverinfo: "y",
                      marker: {
                        color: FixedColors.externalBudget
                      },
                      type: "bar",
                      orientation: "h",
                      labels: [],
                      name: "Средства от ЕС и други международни проекти и програми (%)",
                    },
                  ]}
                  layout={{
                    legend:{ orientation: 'h' },
                    margin: {
                      t: 0,
                      l: 0,
                    },
                    yaxis: {
                      tickvals: [],
                      showgrid: false
                    },
                    xaxis: {
                      range: [0, 100],
                      showgrid: false
                    },
                    width: 560,
                    height: 100,
                    barmode: "stack",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Plot
          config={{ displayModeBar: false }}
          data={[
            {
              y: activityData.map((a) => a.activity),
              x: activityData.map(
                (a) =>
                  (a.nationalBudget / (a.nationalBudget + a.externalBudget)) *
                  100
              ),
              width: 0.4,
              hoverinfo: "y",
              marker: {
                color: FixedColors.nationalBudget,
              },
              type: "bar",
              orientation: "h",
              labels: [],
              name: "Средства от националния бюджет (%)",
            },
            {
              y: activityData.map((a) => a.activity),
              x: activityData.map(
                (a) =>
                  (a.externalBudget / (a.nationalBudget + a.externalBudget)) *
                  100
              ),
              width: 0.4,
              hoverinfo: "y",
              marker: {
                color: FixedColors.externalBudget,
              },
              type: "bar",
              orientation: "h",
              labels: [],
              name: "Средства от ЕС и други международни проекти и програми (%)",
            },
          ]}
          layout={{
            margin: {
              t: 0,
            },
            legend: {
              orientation: 'h'
            },
            yaxis: {
              tickvals: [],
            },
            xaxis: {
              range: [0, 100],
            },
            width: 1080,
            height: 300,
            barmode: "stack",
          }}
        />
      </div>
    </div>
  );
};

export { ActivityBudgetChart };
