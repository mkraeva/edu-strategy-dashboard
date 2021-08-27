import { createUseStyles, WithStylesProps } from 'react-jss';
import { PIE_CHART_LAYOUT } from './components/priority-area/common.styles';
import { AreaTheme } from './themes';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    budgetChartContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    budgetChartChartContainer: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: `${PIE_CHART_LAYOUT.width + PIE_CHART_LAYOUT.margin.l + PIE_CHART_LAYOUT.margin.r}px`,
    },
    totalsData: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      flexGrow: 1,
      fontSize: '1.1em',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    totalsNumber: {
      fontSize: '3em',
      fontFamily: 'Open Sans Condensed',
    }
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
