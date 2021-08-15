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
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
