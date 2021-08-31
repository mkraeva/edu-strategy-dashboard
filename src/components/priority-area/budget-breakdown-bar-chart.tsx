import { useTheme } from "react-jss";
import { formatLv, Plot } from "../../lib/util";
import { AreaTheme } from "../../themes";
import { CHART_CONFIG, COLORS } from "./common.styles";

export type BudgetBreakdownData = {
  name: string;
  nationalBudget: number;
  euBudget: number;
};

const xaxisLayout = (data: BudgetBreakdownData) => {
  const budgetRatio = data.nationalBudget / (data.euBudget + 1);
  return {
    showgrid: false,
    zeroline: false,
    fixedrange: true,
    tickmode: 'array',
    tickvals: [
      budgetRatio < 0.3 ? 0 : data.nationalBudget / 2,
      data.nationalBudget + data.euBudget / 2,
    ],
    ticktext: [formatLv(data.nationalBudget), formatLv(data.euBudget)],
    ticklabelposition: budgetRatio < 0.3 ? 'outside right' : 'outside',
    ticklabeloverflow: 'allow',
  };
}

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
              color: areaThemed ? theme.budgetColor : COLORS.nationalBudget,
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
              color: areaThemed ? theme.euProgramColor : COLORS.euBudget,
            },
            type: "bar",
            orientation: "h",
            labels: [data.euBudget],
            name: "Средства от ЕС и други международни проекти и програми (%)",
          },
        ]}
        layout={{
          showlegend: false,
          dragmode: false,
          height: 70,
          width: 700,
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          margin: {
            pad: 0,
            t: 0,
            b: 50,
            l: 0,
          },
          yaxis: {
            visible: false,
            fixedrange: true,
          },
          xaxis: xaxisLayout(data) as any,
          autosize: true,
          barmode: "stack",
        }}
      />
    </>
  );
};
