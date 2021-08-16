import { useTheme } from "react-jss";
import Plot from "react-plotly.js";
import { ExpenditureData } from "../../services/data";
import { AreaTheme } from "../../themes";
import { EXPEDITURE_CHART_WIDTH, useStyles } from "./activity-expenditure.styles";
import { NationalEUBudgetLegend } from "./national-vs-eu-budget-legend";

const ActivityExpenditure: React.FC<{ expenditureData: ExpenditureData[] }> = ({ expenditureData }) => {
  const theme = useTheme<AreaTheme>();
  const classes = useStyles({ theme });

  return (
    <div className={classes.expeditureContainer}>
      <Plot
        config={{ displayModeBar: false }}
        data={[
          {
            y: expenditureData.map((a) => a.expenseType),
            x: expenditureData.map(
              (a) => a.nationalBudget
            ),
            width: 0.4,
            hoverinfo: "x",
            marker: {
              color: theme.budgetColor,
              width: 0.25,
            },
            type: "bar",
            orientation: "h",
            name: "Средства от националния бюджет (%)",
          },
          {
            y: expenditureData.map((a) => a.expenseType),
            x: expenditureData.map((a) => a.externalBudget),
            width: 0.4,
            hoverinfo: "x",
            marker: {
              color: theme.euProgramColor,
              width: 0.25,
            },
            type: "bar",
            orientation: "h",
            name: "Средства от ЕС и други международни проекти и програми (%)",
          },
        ]}
        layout={{
          dragmode: false,
          width: EXPEDITURE_CHART_WIDTH,
          yaxis: {
            automargin: true,
          },
          showlegend: false,
          barmode: "stack",
        }}
      />
      <NationalEUBudgetLegend></NationalEUBudgetLegend>
    </div>
  );
};

export { ActivityExpenditure };
