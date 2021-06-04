import { makeStyles } from '@material-ui/core/';

const manageUsersStyles = makeStyles((theme) => ({
  root: {},
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: '18px 35px',
    borderRadius: '20px 20px 0 0',
    minWidth: 650,
    // overflow: 'scroll',

    '@media (max-width: 487px)': {
      padding: '18px 20px'
    },
  },
  tableHeading: {
    color: theme.palette.primary.main,
    fontSize: 14,
    margin: 0,
    fontWeight: 600,

    '@media (max-width: 365px)': {
      fontSize: 12
    },
  },
  tableHeadingSub: {
    color: '#ADB8CD',
    fontSize: 14,
    fontWeight: 500,
    opacity: .7,

    '@media (max-width: 365px)': {
      fontSize: 12
    },
  },
}));

export default manageUsersStyles;
