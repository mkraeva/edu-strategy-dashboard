import { sortBy } from "lodash";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useStyles } from "./activity-budget-chart.styles";
import { Plot } from "../../lib/util";
import { ActivityData, ExpenditureData } from "../../services/data";
import { AreaTheme, generateShades } from "../../themes";
import YearBreakdown from "../../year-breakdown";
import { ActivityExpenditure } from "./activity-expenditure";
import { useTheme } from "react-jss";
import { NationalEUBudgetLegend } from "./national-vs-eu-budget-legend";

type ActivityBudgetChartProps = {
  activityData: ActivityData[];
  expenditureData: ExpenditureData[];
};

interface RouterMatch {
  id: string; // priority area id
  activity?: string; // selected activity
}
const ActivityBudgetChart: React.FC<ActivityBudgetChartProps> = ({
  activityData, expenditureData
}) => {
  const theme = useTheme<AreaTheme>();
  const classes = useStyles({ theme });

  const { params: { id: areaId, activity } } = useRouteMatch<RouterMatch>();
  activityData.sort((a, b) => (a.nationalBudget < b.nationalBudget ? 1 : -1));
  const areaName = activityData[0]?.area;
  const areaColor = theme.primaryColor;
  const reordered = sortBy(
    activityData,
    (d) => d.activity
  );
  const colors = generateShades(areaColor, reordered.length);
  return (
    <div className={classes.activityBudgetChartContainer}>
      <h2 className="chart-title">
        Разпределение на средствата по дейности в рамките на приоритетната област
      </h2>
      <p>Графиките показват разпределението на средствата по различните пера и дейности, финансирани в образователната система</p>
      <div className={classes.activityBudgetContainer}>
        <div className={classes.activityBudgetChartContainer}>
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
        <div className={classes.activityBudgetLegendContainer}>
          <div className={classes.activityBudgetLegendList}>
          {reordered.map((activityData, idx) => (
            <div key={activityData.activity} className={classes.activityEntry}>
              <div className={classes.activityTitle}>
                <div
                  className={classes.activityLogo}
                  style={{
                    backgroundColor: colors[idx],
                  }}
                />
                <Link
                  to={`/priority-area/${areaId}/${activityData.activity}`}
                  className={classes.activityExpenditureLink}
                >
                  {activityData.activity}
                </Link>
              </div>
              <Plot
                config={{ displayModeBar: false, staticPlot: true }}
                data={[
                  {
                    y: [activityData.activity],
                    x: [activityData.nationalBudget],
                    hoverinfo: "x",
                    width: 0.25,
                    marker: {
                      color: theme.budgetColor,
                    },
                    type: "bar",
                    orientation: "h",
                    name: "Средства от националния бюджет (%)",
                  },
                  {
                    y: [activityData.activity],
                    x: [activityData.externalBudget],
                    hoverinfo: "x",
                    width: 0.25,
                    marker: {
                      color: theme.euProgramColor
                    },
                    type: "bar",
                    orientation: "h",
                    labels: [],
                    name: "Средства от ЕС и други международни проекти и програми (%)",
                  },
                ]}
                layout={{
                  showlegend: false,
                  margin: {
                    t: 0,
                    l: 0,
                  },
                  yaxis: {
                    visible: false,
                    tickvals: [],
                    showgrid: false
                  },
                  xaxis: {
                    zeroline: false,
                    showgrid: false
                  },
                  width: 500,
                  height: 100,
                  barmode: "stack",
                  barnorm: "percent",
                }}
              />
            </div>
          ))}
          </div>
          <NationalEUBudgetLegend></NationalEUBudgetLegend>
        </div>
      </div>
      {!!activity && <ActivityExpenditure 
        expenditureData={expenditureData.filter(d => d.area === areaName && d.activity === activity)}
      />}
    </div>
  );
};

export { ActivityBudgetChart };
