import { useTheme } from "react-jss";
import { formatLv, Plot } from "../../lib/util";
import { AreaTheme } from "../../themes";
import { CHART_CONFIG } from "./common.styles";

export type BudgetBreakdownData = {
  name: string;
  nationalBudget: number;
  euBudget: number;
};

export type BudgetSourceBreakdownBarChartProps = {
  data: BudgetBreakdownData;
  areaThemed: boolean;
};

export const BudgetSourceBreakdownBarChart = ({
  data,
  areaThemed,
}: BudgetSourceBreakdownBarChartProps) => {
  const theme = useTheme<AreaTheme>();
  return (
    <>
      <Plot
        config={CHART_CONFIG}
        data={[
          {
            y: [data.name],
            x: [data.nationalBudget],
            hovertext: [formatLv(data.nationalBudget)],
            hoverinfo: "text",
            width: 0.25,
            marker: {
              color: areaThemed ? theme.budgetColor : "#024B76",
            },
            type: "bar",
            orientation: "h",
            name: "Средства от националния бюджет (%)",
            labels: [data.nationalBudget],
          },
          {
            y: [data.name],
            x: [data.euBudget],
            hovertext: [formatLv(data.euBudget)],
            hoverinfo: "text",
            width: 0.25,
            marker: {
              color: areaThemed ? theme.euProgramColor : "#0678A9",
            },
            type: "bar",
            orientation: "h",
            labels: [data.euBudget],
            name: "Средства от ЕС и други международни проекти и програми (%)",
          },
        ]}
        layout={{
          dragmode: false,
          showlegend: false,
          margin: {
            t: 0,
            l: 0,
          },
          yaxis: {
            visible: false,
          },
          xaxis: {
            showgrid: false,
            zeroline: false,
            tickvals: [
              data.nationalBudget / 2,
              data.nationalBudget + data.euBudget / 2,
            ],
            ticktext: [formatLv(data.nationalBudget), formatLv(data.euBudget)],
          },
          width: 500,
          height: 100,
          barmode: "stack",
        }}
      />
    </>
  );
};
