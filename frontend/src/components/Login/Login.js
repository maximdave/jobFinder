import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import loginStyles from './login.styles';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, selectUser, selectIsLoggingIn } from '../../redux/authSlice';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLastLocation } from 'react-router-last-location';
import { pageTransition, transit } from '../../utils/animate';
import { motion } from 'framer-motion';

export default function Login() {
  const classes = loginStyles();
  const [values, setValues] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggingIn = useSelector(selectIsLoggingIn);
  const history = useHistory();
  const lastLocation = useLastLocation();

  useEffect(() => {
    if (user) {
      history.push('/');
      // if (lastLocation === null || lastLocation.pathname === '/login') {
      // } else {
      //   history.goBack();
      // }
      // history.goBack();
    }
  }, [user, history, lastLocation]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);

    dispatch(signUp({ data: values, auth: 'login' }));
  };

  return (
    <motion.div
    initial="out"
    animate="in"
    exit="out"
    variants={pageTransition}
    transition={transit}
    >
      <Container
      component='main' maxWidth='xs'>
        <CssBaseline />

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h3'>
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <p className={classes.errMsg}></p>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              color='primary'
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              color='primary'
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={values.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </form>
          {isLoggingIn ? (
            <Backdrop className={classes.backdrop} open={true} style={{zIndex: 9999999}}>
              <CircularProgress className={classes.backdrop} style={{color: '#ffffff'}} />
            </Backdrop>
          ) : (
            ''
          )}
        </div>
      </Container>
    </motion.div>
  );
}
