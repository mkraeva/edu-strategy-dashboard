import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../themes';
import { smallLogo } from './common.styles';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    activityBudgetLegend: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',

      marginTop: '10px',
    },
    legendIndicationContainer: {
    },
    legendIndication: {
      ...smallLogo(32, 6),
    },
    legendText: {

    },
  };  
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;