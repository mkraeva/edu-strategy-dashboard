import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../themes';
import { smallLogo } from './common.styles';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    activityBudgetLegend: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',

      marginTop: '10px',
    },
    legendIndicationContainer: {
      paddingRight: 10
    },
    legendIndication: {
      ...smallLogo(48, 10),
    },
    legendText: {

    },
  };  
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
