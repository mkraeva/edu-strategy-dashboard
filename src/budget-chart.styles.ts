import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from './themes';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    budgetChartContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
    },
    chartTitle: {
      fontSize: '1.5em',
    },
    budgetChartChartContainer: {
      display: 'flex',
      flexDirection: 'column',
      // maxWidth: `${PIE_CHART_LAYOUT.width + PIE_CHART_LAYOUT.margin.l + PIE_CHART_LAYOUT.margin.r}px`,
    },
    totalsData: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flexGrow: 1,
      fontSize: '1.1em',
      fontWeight: 'bold',
      textAlign: 'center',
      '&>div': {
        marginTop: '3em',
      }
    },
    totalsNumber: {
      fontSize: '3em',
      fontFamily: 'Open Sans Condensed',
    }
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
