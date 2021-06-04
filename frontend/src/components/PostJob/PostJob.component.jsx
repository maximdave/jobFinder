import React, { useState } from 'react'
import postJobStyles from './postJob.styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useDispatch, useSelector } from 'react-redux';
import { postJob, selectIsPostingJob, selectNewJobErr } from '../../redux/jobsSlice';
import { validateEmail } from '../../utils/utilFunctions';
import { selectUser } from '../../redux/authSlice';
import InputAdornment from '@material-ui/core/InputAdornment';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';




const PostJob = () => {
  const classes = postJobStyles();
  const [values, setValues] = useState({title: "", salary: "", category: "", location: "",
  companyName: "", companyEmail: "", description: ""});
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const isPostingJobs = useSelector(selectIsPostingJob)
  const postJobErr = useSelector(selectNewJobErr)
  // const postJobErr = useSelector(selectNewJobErr)

  const handleChange = e => {
    const { value, name } = e.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = e => {
    const { title, salary, category, location, companyEmail, companyName, description } = values
    e.preventDefault();
    if (!title || !salary || !category || !location || !companyEmail || !companyName || !description ) {
      alert('please complete all fields')
      return;
    }

    if (!validateEmail(companyEmail)) {
      alert('Email is invalid');
      return;
    }
    dispatch(postJob({data: values, token: user.token }))
    setValues({title: "", salary: "", category: "", location: "",
    companyName: "", companyEmail: "", description: ""});
  }

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      transition={transit}
    >
      <h1 className={classes.jobTitle}>Add Job!</h1>
      <form className={classes.jobForm} onSubmit={handleSubmit}>
        <h6 className={classes.subHeading}>Job Detail</h6>
        <div className={classes.formGroup}>
          <Grid container  >
            <Grid container item md={8} sm={12} xs={12} justify="space-between">
              <Grid item md={6} sm={12} xs={12}>
                <TextField id="outlined-basic" label="Job Title" variant="outlined"
                  className={clsx(classes.formInput, classes.formMargin)} name="title"
                  value={values.title} onChange={handleChange}
                />
              </Grid>
              <Grid item md={5} sm={12} xs={12}>
                <TextField id="outlined-basic" label="Location" variant="outlined"
                  className={clsx(classes.formInput)} name="location"
                  value={values.location} onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.formGroup}>
          <Grid container  >
            <Grid container item md={8} sm={12} xs={12} justify="space-between">
              <Grid item md={6} sm={12} xs={12}>
                <TextField id="outlined-basic" label="Salary" variant="outlined" type="number"
                  className={clsx(classes.formInput, classes.formMargin, classes.numberTxt)} name="salary"
                  value={values.salary} onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">&#8358;</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item md={5} sm={12} xs={12}>
              <FormControl variant="outlined" className={classes.formInput}>
                <InputLabel id="demo-simple-select-outlined-label" style={{width: 70}}>Category</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={values.category}
                  onChange={handleChange}
                  label="category" name="category"
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                </Select>
              </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className={classes.formGroup}>
          <Grid container  >
            <Grid container item md={8} sm={12} xs={12} justify="space-between">
              <Grid item md={12} sm={12} xs={12}>
                <TextField id="outlined-basic" label="Job Description" variant="outlined"
                  className={clsx(classes.formInput, classes.formMargin)} name="description"
                  value={values.description} onChange={handleChange} multiline
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <h6 className={classes.subHeading}>Company Detail</h6>
        <div className={classes.formGroup}>
          <Grid container  >
            <Grid container item md={8} sm={12} xs={12} justify="space-between">
              <Grid item md={6} sm={12} xs={12}>
                <TextField id="outlined-basic" label="Name" variant="outlined"
                  className={clsx(classes.formInput, classes.formMargin)} name="companyName"
                  value={values.companyName} onChange={handleChange}
                />
              </Grid>
              <Grid item md={5} sm={12} xs={12}>
                <TextField id="outlined-basic" label="email" variant="outlined"
                  className={clsx(classes.formInput)} name="companyEmail"
                  value={values.companyEmail} onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          className={classes.searchBtn}
          startIcon={<PostAddIcon />}
          type="submit"
        >
          Post Job
        </Button>
        <p style={{display: 'block'}}>{postJobErr && `An error occurred', couldn't post job`}</p>
      </form>
        {isPostingJobs ? (
          <Backdrop className={classes.backdrop} open={true} style={{zIndex: 9999999}}>
            <CircularProgress className={classes.backdrop} style={{color: '#ffffff'}} />
          </Backdrop>
        ) : (
          ''
        )}
    </motion.div>
  )
}

export default PostJob
