import { makeStyles } from '@material-ui/core/';

const uploadStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  uploadHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px',
  },
  title: {
    color: theme.palette.primary.main,
    marginRight: 50,
  },
  myCv: {
    fontSize: 20,
  },
  icon: {
    fontSize: 50,
    color: theme.palette.primary.main,
  },
  drag: {
    fontSize: 18,
    fontWeight: 700,
    margin: '40px 0',
  },
  baseStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#bdbdbd',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    width: '50vw',
    margin: '0 auto',
    minHeight: '300px',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  fileTxt: {
    color: '#bdbdbd',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 500,
    marginTop: 30,
  },
}));

export default uploadStyles;
