import { makeStyles } from '@material-ui/core';

const featuredStyles = makeStyles((theme) => ({
  root: {
    textDecoration: 'none',
    width: '60%',
    margin: '0 auto',
    background: 'rgba(221, 221, 233, 0.301)',
    padding: '30px',
    borderRadius: '20px',
    marginBottom: '30px',

    '&:hover': {
      // border: '1px solid #737373',
      boxShadow: '1px 1px 15px 0px rgba(0,0,0,0.20)',
    },

    '@media (max-width: 945px)': {
      width: '80%',
      padding: '20px',
    },

    '@media (max-width: 572px)': {
      width: '90%',
      padding: '10px',
    },
  },
  bg: {},
  featureTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobTitle: {
    color: theme.palette.primary.main,
    fontSize: '20px',
    margin: 0,

    '@media (max-width: 945px)': {
      fontSize: '15px',
    },
  },
  location: {
    display: 'flex',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: '25px',
    marginRight: 20,
    color: theme.palette.secondary.main,
  },
  locationTxt: {
    color: theme.palette.primary.light,
    fontSize: '20px',
    margin: 0,

    '@media (max-width: 945px)': {
      fontSize: '15px',
    },
  },
  company: {
    display: 'flex',
    alignItems: 'center',
  },
  companyIcon: {
    color: theme.palette.secondary.main,
    marginRight: 15,
  },
  companyText: {
    fontSize: 15,
    fontWeight: 700,
    color: theme.palette.primary.light,

    '@media (max-width: 945px)': {
      fontSize: '10px',
    },
  },
  jobDescription: {},
  descriptionText: {
    fontSize: 16,
    textAlign: 'justify',
    color: theme.palette.primary.light,

    '@media (max-width: 945px)': {
      fontSize: '13px',
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  days: {
    fontSize: 15,
    color: theme.palette.secondary.dark,

    '@media (max-width: 945px)': {
      fontSize: '13px',
    },
  },
  more: {
    fontSize: 20,
    fontWeight: 700,
    color: theme.palette.primary.main,

    '@media (max-width: 945px)': {
      fontSize: '15px',
    },
  },
  loaderTop: {
    display: 'grid',
    gridTemplateColumns: '.6fr .7fr',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  loaderSmall: {
    width: '70px',
    marginLeft: 'auto',
  },
  loaderIcon: {
    display: 'grid',
    gridTemplateColumns: '20px 70px',
    gridColumnGap: '30px'
  }
}));

export default featuredStyles;
