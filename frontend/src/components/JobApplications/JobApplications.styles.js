import { makeStyles } from '@material-ui/core/';

const jobAppStyles = makeStyles((theme) => ({
  root: {
    textDecoration: 'none',
    backgroundColor: '#ffffff',
    width: '45%',
    padding: '15px',
    borderRadius: '20px',
    marginBottom: 20,

    '&:hover': {
      // border: '1px solid #737373',
      boxShadow: '1px 1px 15px 0px rgba(0,0,0,0.20)',
    },

    '@media (max-width: 810px)': {
      width: '60%',
      margin: '0 auto 10px auto',
    },
    '@media (max-width: 546px)': {
      width: '80%',
    },

    '@media (max-width: 407px)': {
      width: '90%',
    },
  },

  top: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  location: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    marginRight: 'auto',
    color: theme.palette.primary.light,
    margin: 0,
  },
  locationIcon: {
    fontSize: 13,
    color: theme.palette.secondary.main,
    marginRight: 10,
  },
  locationTxt: {
    color: theme.palette.primary.light,
    fontSize: 11,
    margin: 0,
  },
  company: {
    display: 'flex',
    alignItems: 'center',
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  dateTitle: {
    margin: 0,
    color: theme.palette.primary.light,
  },
  dateDate: {
    margin: 0,
    color: theme.palette.primary.main,
  },
  ApplicantsBox: {
    marginTop: 10,
  },
  number: {
    color: theme.palette.secondary.main,
  },
  listTxt: {
    margin: 0,
    fontWeight: 500,
    color: theme.palette.primary.main,
    marginLeft: '-20px',
  },
  menuIcon: {
    color: theme.palette.secondary.main,
  },
  locationEmail: {
    color: theme.palette.primary.main,
    margin: 0,
  },
  cover: {
    display: 'flex',
    alignItems: 'center',
  },
  coverTitle: {
    margin: 0,
    fontSize: 15,
    color: theme.palette.primary.main,
    marginLeft: 10,
  },
  coverIcon: {
    color: theme.palette.secondary.main,
  },
  coverTxt: {
    margin: 0,
    marginTop: 10,
    lineHeight: 1.4,
    textAlign: 'justify',
    color: theme.palette.primary.light,
  }
}));

export default jobAppStyles;
