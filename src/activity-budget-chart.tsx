import { sortBy } from "lodash";
import { relative } from "path";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useStyles } from "./components/priority-area/budget-source-chart.styles";
import { Plot } from "./lib/util";
import { ActivityData, ExpenditureData } from "./services/data";
import { generateShades, getAreaTheme } from "./themes";
import YearBreakdown from "./year-breakdown";

type ActivityBudgetChartProps = {
  activityData: ActivityData[];
  expenditureData: ExpenditureData[];
};

const FixedColors = {
  nationalBudget: '#FAB316',
  externalBudget: '#0678A9'
};

const ActivityExpenditure: React.FC<{ expenditureData: ExpenditureData[] }> = ({ expenditureData }) => {
  return (
    <div>
      <Plot
        data={[
          {
            y: expenditureData.map((a) => a.expenseType),
            x: expenditureData.map(
              (a) => a.nationalBudget
            ),
            labels: expenditureData.map(e => e.expenseType),
            width: 0.4,
            hoverinfo: "text",
            marker: {
              color: FixedColors.nationalBudget,
            },
            type: "bar",
            orientation: "h",
            name: "Средства от националния бюджет (%)",
          },
          {
            y: expenditureData.map((a) => a.expenseType),
            x: expenditureData.map(
              (a) => a.externalBudget),
            labels: expenditureData.map(e => e.expenseType),
            width: 0.4,
            textinfo: "none",
            hoverinfo: "text",
            marker: {
              color: FixedColors.externalBudget,
            },
            type: "bar",
            orientation: "h",
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
          height: 300,
          barmode: "stack",
        }}
      />
    </div>
  );
};
interface RouterMatch {
  id: string; // priority area id
  activity?: string; // selected activity
}
const ActivityBudgetChart: React.FC<ActivityBudgetChartProps> = ({
  activityData, expenditureData
}) => {
  const { url, params: { activity } } = useRouteMatch<RouterMatch>();
  activityData.sort((a, b) => (a.nationalBudget < b.nationalBudget ? 1 : -1));
  const areaName = activityData[0]?.area;
  const classes = useStyles();
  const areaColor = activityData.length
    ? getAreaTheme(areaName).primaryColor
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
              <div>
                <Link
                  to={`${url}/${activityData.activity}`}
                >
                  {activityData.activity}
                </Link>
                <Plot
                  config={{ displayModeBar: false }}
                  data={[
                    {
                      y: [activityData.activity],
                      x: [activityData.nationalBudget],
                      hoverinfo: "x",
                      width: 0.25,
                      marker: {
                        color: FixedColors.nationalBudget
                      },
                      type: "bar",
                      orientation: "h",
                      // text: [`${activityData.nationalBudget} лв.`],
                      name: "Средства от националния бюджет (%)",
                    },
                    {
                      y: [activityData.activity],
                      x: [activityData.externalBudget],
                      hoverinfo: "x",
                      width: 0.25,
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
                    barnorm: "percent",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {!!activity && <ActivityExpenditure 
        expenditureData={expenditureData.filter(d => d.area === areaName && d.activity === activity)}
      />}
    </div>
  );
};

export { ActivityBudgetChart };
