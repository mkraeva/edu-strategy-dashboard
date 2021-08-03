import React from "react";
import Plot from "react-plotly.js";
import { AreaLegend } from "./area-legend";
import { useStyles } from "./budget-chart.styles";
import { ActivityData } from "./services/data";
import { getAreaTheme } from "./themes";
import YearBreakdown from "./year-breakdown";

type ActivityBudgetChartProps = {
  activityData: ActivityData[];
};

const ActivityBudgetChart: React.FC<ActivityBudgetChartProps> = ({
  activityData,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.budgetChartContainer}>
      <div className={classes.budgetChartChartContainer}>
        <p>Заглавие, което обяснява какво показва тази графика</p>
        <YearBreakdown />
        <Plot
          data={[
            {
              labels: activityData.map((d) => d.area),
              values: activityData.map(
                (d) => d.nationalBudget + d.externalBudget
              ),
              marker: {
                colors: activityData.map(
                  (d) => getAreaTheme(d.area).primaryColor
                ),
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
