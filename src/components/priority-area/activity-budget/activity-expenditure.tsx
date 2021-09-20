import { useTheme } from "react-jss";
import Plot from "react-plotly.js";
import { ExpenditureData } from "../../../services/data";
import { AreaTheme } from "../../../themes";
import { useStyles } from "./activity-expenditure.styles";
import { CHART_CONFIG } from "../common.styles";
import { NationalEUBudgetLegend } from "../national-vs-eu-budget-legend";

function fold(s: string, n: number, useSpaces: boolean, a: Array<string> = []): Array<string> {
    a = a || [];
    if (s.length <= n) {
        a.push(s);
        return a;
    }
    var line = s.substring(0, n);
    if (! useSpaces) { // insert newlines anywhere
        a.push(line);
        return fold(s.substring(n), n, useSpaces, a);
    }
    else { // attempt to insert newlines after whitespace
        var lastSpaceRgx = /\s(?!.*\s)/;
        var idx = line.search(lastSpaceRgx);
        var nextIdx = n;
        if (idx > 0) {
            line = line.substring(0, idx);
            nextIdx = idx;
        }
        a.push(line);
        return fold(s.substring(nextIdx), n, useSpaces, a);
    }
}

const ActivityExpenditure: React.FC<{ expenditureData: ExpenditureData[] }> = ({ expenditureData }) => {
  const theme = useTheme<AreaTheme>();
  const classes = useStyles({ theme });

  return (
    <>
      <h2 className="chart-title">{expenditureData[0]?.activity}</h2>
      <div className={classes.expeditureContainer}>
        <Plot
          config={CHART_CONFIG}
          data={[
            {
              y: expenditureData.map((a) => fold(a.expenseType, window.innerWidth > 480 ? 40 : 20, true).join('<br>')),
              x: expenditureData.map(
                (a) => a.nationalBudget
              ),
              hoverinfo: "x",
              width: 0.25,
              marker: {
                color: theme.budgetColor,
                width: 0.25,
              },
              type: "bar",
              orientation: "h",
              name: "Средства от националния бюджет (%)",
            },
            {
              y: expenditureData.map((a) => fold(a.expenseType, window.innerWidth > 480 ? 40 : 20, true).join('<br>')),
              x: expenditureData.map((a) => a.externalBudget),
              hoverinfo: "x",
              width: 0.25,
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
            // title: expenditureData[0]?.activity,
            dragmode: false,
            margin: {
              pad: 20,
              t: 10,
              l: 0,
              r: 0,
            },
            // legend: {
            //   orientation: 'h'
            // },
            // yaxis: {
            //   tickvals: [],
            // },
            height: 300,
            // width: EXPEDITURE_CHART_WIDTH,
            autosize: true,
            yaxis: {
              automargin: true,
            },
            showlegend: false,
            barmode: "stack",
          }}
        />
        <NationalEUBudgetLegend></NationalEUBudgetLegend>
      </div>
    </>
  );
};

export { ActivityExpenditure };
