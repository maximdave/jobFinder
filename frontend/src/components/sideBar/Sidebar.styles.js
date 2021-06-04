import { makeStyles } from '@material-ui/core/';

const sidebarStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    backgroundColor: theme.palette.grey[50],
    minHeight: '100vh',
  },
  logo: {
    width: 130,
    marginLeft: 15,
  },
  navList: {
    paddingLeft: 0,
  },
  navLink: {
    paddingLeft: 10,
    // backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    backgroundColor: '#ffffff',
    margin: '0px 10px 10px 10px',
    borderRadius: 10
  },
  navIcon: {
    marginRight: 15,
    fontSize: 15,
  },
  txt: {
    color: theme.palette.primary.main,
    fontSize: 13,
  },
}));

export default sidebarStyles;
