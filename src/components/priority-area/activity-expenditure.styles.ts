import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../themes';

export const EXPEDITURE_CHART_WIDTH = 700;

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    expeditureContainer: {
      display: 'flex',
      flexDirection: 'column',

      maxWidth: `${EXPEDITURE_CHART_WIDTH}px`,
    }
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
