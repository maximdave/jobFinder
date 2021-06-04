import { makeStyles } from '@material-ui/core/';

const tableStyles = makeStyles((theme) => ({
  container: {
    overflowX: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: '0 0 20px 20px',
    paddingBottom: 20,
  },
  table: {
    minWidth: 650,
    overflow: 'scroll',
  },
  tableHeading: {
    fontSize: 17,
    fontWeight: 700,
    color: theme.palette.primary.main,
    textTransform: 'capitalize'
  },
  tableBody: {
    background: '#fff',
  },
  tableRow: {
    textDecoration: 'none',

    '&:hover': {
      background: '#F5F7FA',
    }
  },
  tableCell: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: 15
  },
  pagination: {
    display: 'flex',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    margin: '0 40px',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#6E80A3',
  },
  arrowBox: {
    backgroundColor: '#ffffff',
    height: 40,
    width: 40,
    borderRadius: '50%',
    boxShadow: '0px 0px 24px rgba(0, 81, 33, 0.16)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ADB8CD',
    cursor: 'pointer',
  },
  active: {
    color: theme.palette.primary.main,
  },
  tableCellBold: {
    color: '#6E80A3',
    fontWeight: 600,
    fontStyle: 'normal',
  },
  tablePadding: {
    paddingTop: '14px !important',
    paddingBottom: '14px !important',
  },
  dotCell: {
    display: 'flex',
    alignItems: 'center'
  },
  dot: {
    background: '#FF8876',
    height: 10,
    width: 10,
    borderRadius: '50%',
    marginRight: 10
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
}));

export default tableStyles;
