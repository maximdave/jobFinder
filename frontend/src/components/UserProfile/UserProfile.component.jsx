import React, { useState } from 'react'
import userProfileStyles from './userProfile.styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { selectUser, updateUser, selectIsUpdatingUser } from '../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { pageTransition, transit } from '../../utils/animate';
import { motion } from 'framer-motion';

const UserProfile = () => {
  const classes = userProfileStyles();
  const [disabled, setDisabled] = useState(true);
  const user = useSelector(selectUser);
  const isUpdating = useSelector(selectIsUpdatingUser);
  const dispatch = useDispatch();


  let firstName, lastName, bio;

  if (user) {
    firstName = user.user.name.split(' ')[0]
    lastName = user.user.name.split(' ')[1]
    bio = user.user.bio
  }


  const [values, setValues] = useState({firstName: `${firstName}`, lastName: `${lastName}`, bio});

  const handleChange = e => {
    const {value, name} = e.target;
    setValues({ ...values, [name]: value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newName = `${values.firstName} ${values.lastName}`
    dispatch(updateUser({token: user.token, data: {name: newName, bio: values.bio}, id: user.user._id}));
    setDisabled(true);
  }

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      transition={transit}
    >
      <div className={clsx(classes.headingFlex) }>
        <h1 className={classes.profileHeading}>My Profile</h1>
        <div className={clsx(classes.headingFlex, classes.headingEdit)} onClick={() => setDisabled(!disabled)}>
          <EditIcon className={classes.editIcons} />
          <p className={classes.editTxt}>Edit</p>
        </div>
      </div>
      <form className={classes.form} onSubmit={handleSubmit} >
        <div className={classes.formGroup}>
          <Grid container  >
            <Grid container item md={8} sm={12} xs={12} justify="space-between">
              <Grid item md={6} sm={12} xs={12}>
                <TextField id="outlined-basic" label="First Name" variant="outlined"
                  className={clsx(classes.formInput, classes.formMargin)} name="firstName"
                  disabled={disabled} value={values.firstName} onChange={handleChange}
                />
              </Grid>
              <Grid item md={5} sm={12} xs={12}>
                <TextField id="outlined-basic" label="Last Name" variant="outlined"
                  className={clsx(classes.formInput)} name="lastName"
                  disabled={disabled} value={values.lastName} onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.formGroup}>
          <Grid container>
            <Grid item md={8} sm={12} xs={12}>
              <TextField id="outlined-basic" label="Bio" multiline variant="outlined" className={classes.formInput}
                disabled={disabled} value={values.bio} name="bio" onChange={handleChange}
              />
            </Grid>
          </Grid>
        </div>

        <Button variant="contained" color="secondary" type="submit"
          disableElevation className={classes.searchBtn} disabled={disabled} >
          Update
        </Button>
      </form>

      {isUpdating ? (
          <Backdrop className={classes.backdrop} open={true} style={{zIndex: 9999999}}>
            <CircularProgress className={classes.backdrop} style={{color: '#ffffff'}} />
          </Backdrop>
        ) : (
          ''
        )}
    </motion.div>
  )
}

export default UserProfile
