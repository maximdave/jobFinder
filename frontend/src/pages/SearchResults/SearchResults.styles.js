import { makeStyles } from '@material-ui/core';

const searchStyles = makeStyles((theme) => ({
  root: {},
  resultContainer: {
    minHeight: '90vh',
    // padding: '80px 0',
  },
  featuredHeading: {
    fontFamily: 'EB Garamond',
    textAlign: 'center',
    fontSize: '35px',
    color: theme.palette.secondary.main,

    '@media (max-width: 484px)': {
      fontSize: 18,
    },
  },
  err: {
    width: '40vw',
    margin: '0 auto',
    // backgroundColor: 'red'
  },
  sorry: {
    fontSize: 30,
    margin: 0,
    fontWeight: 500,
    color: theme.palette.primary.main,
  },
  errTxt: {
    margin: '20px 0',
    color: theme.palette.primary.main,
  },
}));

export default searchStyles;
