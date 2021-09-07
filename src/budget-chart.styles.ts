import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from './themes';
import { PIE_CHART_LAYOUT } from './components/priority-area/common.styles';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    budgetChartContainer: {
      display: 'flex',
      flexDirection: 'row',
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
    },
    budgetChartTitle: {
    },
    '@media screen and (max-width: 480px)': {
      budgetChartContainer: {
        flexDirection: 'column',
      },
      totalsData: {
        order: -1,
        fontSize: '1em',
        '&>div': {
          marginTop: 0,
        }
      },
      budgetChartTitle: {
        order: -3,
      }
    },
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
