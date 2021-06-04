import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import useStyles from './register.styles';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, selectUser, selectIsLoggingIn } from '../../redux/authSlice';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import { validateEmail } from '../../utils/utilFunctions';
import { pageTransition, transit } from '../../utils/animate';
import { motion } from 'framer-motion';

const categories = [
  {
    value: 'applicant',
    label: 'Job Seeker',
  },
  {
    value: 'employer',
    label: 'Empolyer',
  },
];

export default function Register() {
  const classes = useStyles();
  const [category, setCategory] = useState(false);
  // const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggingIn = useSelector(selectIsLoggingIn);
  const history = useHistory();
  const lastLocation = useLastLocation();

  // console.log(isLoggingIn);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    errMessage: '',
  });

  useEffect(() => {
    if (user) {
      history.push('/');
      // if (lastLocation === null || lastLocation.pathname === '/login') {
      // } else {
      //   history.goBack();
      // }
    }
  }, [user, history, lastLocation]);

  // const fileSelectHandler = (e) => {
  //   setFile(e.target.files[0]);
  //   console.log(file);
  //   // setSelectedFile(e.target.files[0]);
  //   const fd = new FormData();
  //   fd.append('document', e.target.files[0], e.target.files[0].name);
  //   //send data in upload
  // };

  // function validateEmail(email) {
  //   var re = /\S+@\S+\.\S+/;
  //   return re.test(email);
  // }

  const handleFieldChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, passwordConfirm } = values;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !passwordConfirm ||
      !passwordConfirm ||
      !category
    ) {
      setValues({ ...values, errMessage: '*Please complete all fields!' });
      return;
    }

    if (!validateEmail(values.email)) {
      setValues({ ...values, errMessage: '*Email is invalid' });
      return;
    }

    if (password.length < 7) {
      setValues({ ...values, errMessage: '*Passwords too short.' });
      return;
    }

    if (passwordConfirm !== password) {
      setValues({ ...values, errMessage: '*Passwords do not match.' });
      return;
    }

    const data = {
      email,
      password,
      role: category,
      name: `${firstName} ${lastName}`,
    };
    // console.log(values, category);

    // const params = { }

    dispatch(signUp({ data, auth: 'signup' }));
    // console.log(user);
    setValues({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errMessage: '',
    });
    setCategory(false);
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
          <Avatar className={classes.avatar} color='primary'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h3'>
            Register
          </Typography>
        </div>
        <p className={classes.errorMessage}>{values.errMessage}</p>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id='firstName'
                label='First Name'
                variant='outlined'
                fullWidth
                name='firstName'
                value={values.firstName}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='lastName'
                label='Last Name'
                variant='outlined'
                fullWidth
                name='lastName'
                value={values.lastName}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                color='primary'
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={values.email}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // id='outlined-select-currency'
                select
                label='Select'
                fullWidth
                color='primary'
                value={category}
                onChange={handleChange}
                helperText='Please select your category'
                variant='outlined'
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                color='primary'
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={values.password}
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                color='primary'
                name='passwordConfirm'
                label='confirm password'
                type='password'
                id='passwordConfirm'
                autoComplete='current-password'
                value={values.passwordConfirm}
                onChange={handleFieldChange}
              />
            </Grid>
            {/* <Grid container justify='flex-end' item xs={12}>
              <Button variant='contained' component='label' color='primary'>
                <AiOutlineCloudUpload />
                Upload Cv
                <input
                  type='file'
                  hidden
                  id='file'
                  name='file'
                  onChange={fileSelectHandler}
                />
              </Button>
            </Grid> */}
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid> */}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        {isLoggingIn ? (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color='#ffffff' />
          </Backdrop>
        ) : (
          ''
        )}
      </Container>

    </motion.div>
  );
}
