import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from '../../../themes';
import { smallLogo } from '../common.styles';
import { LegendEntryProps } from './activity-legend-entry';
export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    activityEntry: {
      display: 'flex',
      flexDirection: 'column',
      // marginBottom: '10px',
      '&:last-of-type': {
        marginBottom: '0px',
      },
      padding: '15px 15px 0',
      cursor: 'pointer',

      color: 'black !important',
      textDecoration: 'none !important',

      "&:hover": {
        backgroundColor: '#F9F9F9',
        '& $activityExpenditureLink': {
          color: theme.primaryColor,
          // textDecoration: 'underline !important',
        },
        '& $seeChartIcon': {
          fill: theme.primaryColor,
          visibility: 'visible',
        },
      }
    },
    selectedActivity: {
      backgroundColor: '#F9F9F9',
      color: theme.primaryColor,
      '& $seeChartIcon': {
        visibility: 'visible',
      }
    },
    activityTitle: {
      display: 'flex',
      flexDirection: 'row',
    },
    activityLogo: {
      ...smallLogo(30, 30),

      marginRight: '16px',
    },
    activityExpenditureLink: {
      fontWeight: '700',
    },
    seeChartIcon: {
      height: '1em',
      verticalAlign: 'middle',
      paddingLeft: '5px',

      visibility: 'hidden',
    },
    areaStats: {
      marginTop: '15px',
      marginBottom: '10px',
    },
    areaPercentage: {
      padding: '0 3px 3px',
    }
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;
