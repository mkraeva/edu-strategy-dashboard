import { createUseStyles, WithStylesProps } from 'react-jss';
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
    },
    legend: {
      display: 'flex',
      flexDirection: 'column',
    },
    areaLegendEntry: {
      margin: '24px',
      maxWidth: '450px',

      display: 'flex',
      flexDirection: 'row',
    },
    areaLogo: {

    },
    areaData: {

    },
    areaStats: {

    },
    areaName: {
      fontWeight: 'bold',
    },
    seeMore: {
      backgroundColor: theme.primaryColor,
      color: 'white',
      boxShadow: '0px 10px 12px #00000029',
      borderRadius: '4px',
      opacity: 1,
    }
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
