import { makeStyles } from '@material-ui/core/';

const applyPageStyles = makeStyles((theme) => ({
  root: {},
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  container: {
    padding: '0 50px',
    width: '60vw',
    margin: '60 auto 0 auto',
  },
  coverTitle: {
    fontSize: 26,
    margin: 0,
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  appBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    // paddingTop:
  },
  pageTitle: {
    fontSize: 30,
    color: theme.palette.primary.main,
    marginRight: 20,
  },
  appIcon: {
    color: theme.palette.primary.main,
  },
  editor: {
    width: '60vw',
    margin: '0 auto 150px auto',
  },
  JobDetail: {
    marginBottom: 30,
  },
  sendBtn: {
    marginTop: 30,
  },
}));

export default applyPageStyles;
