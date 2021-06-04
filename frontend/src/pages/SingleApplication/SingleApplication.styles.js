import { makeStyles } from '@material-ui/core/';

const singleApplication = makeStyles((theme) => ({
  root: {
    marginTop: 70,

    '@media (max-width: 768px)': {
      marginTop: '30px'
    }
  },
  applicationHeading: {
    margin: 0,
    fontSize: 18,
    color: theme.palette.primary.light,
    fontWeight: 600,
    marginBottom: 10,
  },
  link: {
    display: 'block',
    fontSize: 16,
    marginBottom: 7,
    color: 'grey',
    maxWidth: 'max-content',
  },
  cover: {
    background: '#FFFFFF',
    padding: '20px',
    borderRadius: 10,
    boxShadow: '1px 1px 15px 0px rgba(0,0,0,0.20)',
  },
  coverTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 10,
  },
  letter: {
    margin: 0,
    textAlign: 'justify',
    fontSize: 17,
    color: '#6B6E73',
  },
  nameBox: {
    marginBottom: 40,

    '@media (max-width: 768px)': {
      marginLeft: '40px'
    }
  },
}));

export default singleApplication;
