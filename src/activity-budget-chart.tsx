import { sortBy } from "lodash";
import React from "react";
import Plot from "react-plotly.js";
import { useStyles } from "./components/priority-area/budget-source-chart.styles";
import { ActivityData } from "./services/data";
import { generateShades, getAreaTheme } from "./themes";
import YearBreakdown from "./year-breakdown";

type ActivityBudgetChartProps = {
  activityData: ActivityData[];
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
      <p>Заглавие, което обяснява какво показва тази графика</p>
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
              <div>{activityData.activity}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ActivityBudgetChart };
