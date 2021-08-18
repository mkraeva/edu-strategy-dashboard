import { sortBy, sumBy } from "lodash";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useStyles } from "./activity-budget-chart.styles";
import { hashActivity, Plot } from "../../lib/util";
import { ActivityData, ExpenditureData } from "../../services/data";
import { AreaTheme, generateShades } from "../../themes";
import YearBreakdown from "../../year-breakdown";
import { ActivityExpenditure } from "./activity-expenditure";
import { useTheme } from "react-jss";
import { NationalEUBudgetLegend } from "./national-vs-eu-budget-legend";
import { CHART_CONFIG, PIE_CHART_LAYOUT } from "./common.styles";
import { BudgetSourceBreakdownBarChart } from "./budget-breakdown-bar-chart";
import NumberFormat from 'react-number-format';

type ActivityBudgetChartProps = {
  activityData: ActivityData[];
  expenditureData: ExpenditureData[];
};

function selectedExpenditure(expenditureData: ExpenditureData[], areaName: string, activity: string) {
  if (activity) {
    return expenditureData.filter(d => d.area === areaName && hashActivity(d.activity) === activity);
  } else if (expenditureData.length) {
    let first = expenditureData[0];
    return expenditureData.filter(d => d.area === first.area && hashActivity(d.activity) === first.activity);
  } else {
    return [];
  }
}

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
            config={CHART_CONFIG}
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
            layout={PIE_CHART_LAYOUT}
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
                  to={`/priority-area/${areaId}/${hashActivity(activityData.activity)}`}
                  className={classes.activityExpenditureLink}
                >
                  {activityData.activity}
                </Link>
              </div>
              <div className={classes.areaStats}>
                <NumberFormat
                  value={activityData.nationalBudget + activityData.externalBudget}
                  thousandSeparator={true}
                  suffix=" лв."
                  displayType="text"
                />
                &nbsp;
                <span className={classes.areaPercentage} style={{
                    backgroundColor: `${colors[idx]}55`,
                  }}>
                  [{(
                    (activityData.nationalBudget + activityData.externalBudget)/
                    sumBy(reordered, d=>d.nationalBudget + d.externalBudget))
                    .toPrecision(2)
                  }%]
                </span>
              </div>
              <BudgetSourceBreakdownBarChart areaThemed={true} data={{
                name: activityData.activity,
                nationalBudget: activityData.nationalBudget,
                euBudget: activityData.externalBudget,
              }}/>
            </div>
          ))}
          </div>
          <NationalEUBudgetLegend></NationalEUBudgetLegend>
        </div>
      </div>
      {!!activity && <ActivityExpenditure 
        expenditureData={selectedExpenditure(expenditureData, areaName, activity || "")}
      />}
    </div>
  );
};

export { ActivityBudgetChart };
