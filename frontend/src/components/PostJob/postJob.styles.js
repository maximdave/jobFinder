import { makeStyles } from '@material-ui/core/';

const postJobStyles = makeStyles((theme) => ({
  root: {},
  formInput: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 10,
  },
  formMargin: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 14,
    margin: 0,
    marginBottom: 5,
    color: theme.palette.primary.light,
  },
  numberTxt: {
    // backgroundColor: 'red',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none !important',
      '-moz-appearance': 'none !important',
      margin: 0,
    },
    '&[type=number]': {
      '-webkit-appearance': 'textfield !important',
      '-moz-appearance': 'textfield !important',
    },
  },
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    flexDirection: 'column',
  },
  editBox: {
    display: 'flex',
    alignItems: 'center',
  },
  edit: {
    marginLeft: '150px',
    textDecoration: 'underline',
    color: theme.palette.secondary.main,
    cursor: 'pointer'
  },
  editTxt: {
    fontSize: 20
  }
}));

export default postJobStyles;
