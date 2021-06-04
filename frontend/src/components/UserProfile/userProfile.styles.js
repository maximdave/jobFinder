import { makeStyles } from '@material-ui/core/';

const userProfileStyles = makeStyles((theme) => ({
  root: {},
  form: {},
  formInput: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 25,
  },
  formMargin: {
    marginBottom: 20,
  },
  profileHeading: {
    color: theme.palette.primary.main,
    fontWeight: 700
  },
  headingFlex: {
    display: 'flex',
    alignItems: 'center'
  },
  headingEdit: {
    marginLeft: '50px',
    textDecoration: 'underline',
    fontSize: '17px',
    cursor: 'pointer'
  }
}));

export default userProfileStyles;
