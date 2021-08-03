import React from "react";
import Plot from "react-plotly.js";
import { AreaLegend } from "./area-legend";
import { useStyles } from "./budget-chart.styles";
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
  return (
    <div className={classes.budgetChartContainer}>
      <div className={classes.budgetChartChartContainer}>
        <p>Заглавие, което обяснява какво показва тази графика</p>
        <YearBreakdown />
        <Plot
          data={[
            {
              labels: activityData.map((d) => d.activity),
              values: activityData.map(
                (d) => d.nationalBudget + d.externalBudget
              ),
              marker: {
                colors: generateShades(areaColor, activityData.length),
              },
              type: "pie",
              showlegend: false,
            },
          ]}
          layout={{ width: 460, height: 480 }}
        />
      </div>
      {/* <AreaLegend activityData={activityData}></AreaLegend> */}
    </div>
  );
};

export { ActivityBudgetChart };
