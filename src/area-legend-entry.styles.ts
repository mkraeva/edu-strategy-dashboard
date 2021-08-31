import { createUseStyles, WithStylesProps } from 'react-jss';
import { AreaTheme } from './themes';

export const useStyles = createUseStyles((theme: AreaTheme) => {
  const result = {
    areaLegendEntry: {
      margin: '24px',
      marginLeft: '50px',
      // maxWidth: '450px',

      display: 'flex',
      flexDirection: 'row',

      paddingTop: '30px',
    },
    areaLogo: {
      width: '70px',
      height: '70px',
      marginRight: '16px',
    },
    areaData: {
      display: 'flex',
      flexDirection: 'column',
    },
    areaStats: {
      marginTop: '15px',
      marginBottom: '10px',
    },
    areaName: {
      fontWeight: 'bold',
      fontSize: '1.3em',
    },
    areaPercentage: {
      // backgroundColor: `${theme.primaryColor}55`,
      padding: '0 3px 3px',
      // fontWeight: 'bold',
    },
    seeMore: {
      display: 'inline-block',

      padding: '9px 18px',

      color: 'white !important',
      backgroundColor: theme.primaryColor,
      borderColor: theme.primaryColor,
      boxShadow: '0px 10px 12px #00000029',
      borderRadius: '4px',

      fontWeight: 'bold',
      textDecoration: 'none !important',

      position: 'relative',
      top: '-30px',
      width: '120px',
      textAlign: 'center',
    }
  };
  return result;
});

export type StyleType = WithStylesProps<typeof useStyles>;