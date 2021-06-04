import { makeStyles } from '@material-ui/core/';

const profileStyles = makeStyles((theme) => ({
  root: {},
  profile: {
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBox: {
    background: '#FFFFFF',
    width: '30%',
    padding: '20px',
    borderRadius: 15,
    boxShadow: '1px 1px 15px 0px rgba(0,0,0,0.20)',
  },
  photoBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIcon: {
    fontSize: 60,
    color: theme.palette.secondary.main,
    textAlign: 'center',
  },
  userName: {
    margin: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 700,
    color: theme.palette.primary.main,
  },
  mail: {
    margin: 0,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  bio: {
    margin: '20px 0'
  },
  heading: {
    margin: 0,
    textAlign: 'center',
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '6px',
    marginBottom: 10
  },
  txt: {
    margin: 0,
    color: '#737373',
    fontSize: 15,
    fontWeight: 500,
  },
}));

export default profileStyles;
