import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import postJobStyles from '../../components/PostJob/postJob.styles';
import UpdateIcon from '@material-ui/icons/Update';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthorJobs, updateJob, selectIsUpdatingJobs } from '../../redux/jobsSlice';
import { useParams } from 'react-router';
import { validateEmail } from '../../utils/utilFunctions';
import { selectUser } from '../../redux/authSlice';
import EditIcon from '@material-ui/icons/Edit';
import Loader from "react-loader-spinner";



const UpdateJob = () => {
  const classes = postJobStyles();
  const authorJobs = useSelector(selectAuthorJobs);
  const isUpdatingJob = useSelector(selectIsUpdatingJobs);
  const [edit, setEdit] = useState(true);
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const { id  } = useParams();


  let job = authorJobs.find(job => job._id === id);
  // console.log(job)

  const { title, location, salary, category, description, companyName, companyEmail } = job;
  const [values, setValues ] = useState({title: `${title}`, location, salary, description, companyName, companyEmail });
  const [cat, setCat] = useState(category.toLowerCase());

  const handleCategory = e => {
    setCat(e.target.value);
  }

  const handleChange = e => {
    const {value, name} = e.target;
    setValues({ ...values, [name]: value });
  }

  const handleSubmit = e => {
    const { title, salary, location, companyEmail, companyName, description } = values
    e.preventDefault();
    if (!title || !salary || !cat || !location || !companyEmail || !companyName || !description ) {
      alert('please complete all fields')
      return;
    }

    if (!validateEmail(companyEmail)) {
      alert('Email is invalid');
      return;
    }

    // console.log(values);
    setEdit(true)

    const data = {
      title,
      salary,
      category,
      companyName,
      companyEmail,
      location,
      description
    }

    dispatch(updateJob({data, token: user.token, id }))
  }


  return (
    <div>
      <div className={clsx(classes.editBox) }>
        <h1 className={classes.jobTitle}>Update Job!</h1>
        <div className={clsx(classes.editBox, classes.edit)} onClick={() => setEdit(false)}>
          <EditIcon className={classes.editIcon} />
          <p className={classes.editTxt}>Edit</p>
        </div>
      </div>

      <form className={classes.jobForm} onSubmit={handleSubmit}>
        <h6 className={classes.subHeading} style={{marginBottom: 20}}>Job Detail</h6>
        <div className={classes.formGroup}>
          <Grid container  >
            <Grid container item md={8} sm={12} xs={12} justify="space-between">
              <Grid item md={6} sm={12} xs={12}>
                <TextField id="outlined-basic" label="Job Title" variant="outlined" name="title"
                  className={clsx(classes.formInput, classes.formMargin)} value={values.title}
                  onChange={handleChange} disabled={edit}
                />
              </Grid>
              <Grid item md={5} sm={12} xs={12}>
                <TextField id="outlined-basic" label="Location" variant="outlined"
                  className={clsx(classes.formInput)} name="location"
                  value={values.location} onChange={handleChange} disabled={edit}
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
                  className={clsx(classes.formInput, classes.formMargin)} name="salary"
                  value={values.salary} onChange={handleChange} disabled={edit}
                />
              </Grid>
              <Grid item md={5} sm={12} xs={12}>
              <FormControl variant="outlined" className={classes.formInput}>
                <InputLabel id="demo-simple-select-outlined-label" style={{width: 70}}>Category</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={cat} name="category"
                  onChange={handleCategory}
                  label="category"
                  disabled={edit}
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  <MenuItem value="technology">technology</MenuItem>
                  <MenuItem value="finance">finance</MenuItem>
                  <MenuItem value="manufacturing">manufacturing</MenuItem>
                  <MenuItem value="marketing">marketing</MenuItem>
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
                <TextField id="outlined-basic" label="Job Description" variant="outlined" multiline
                  className={clsx(classes.formInput, classes.formMargin)} name="description"
                  value={values.description} onChange={handleChange} disabled={edit}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <h6 className={classes.subHeading} style={{marginBottom: 20}}>Company Detail</h6>
        <div className={classes.formGroup}>
          <Grid container  >
            <Grid container item md={8} sm={12} xs={12} justify="space-between">
              <Grid item md={6} sm={12} xs={12}>
                <TextField id="outlined-basic" label="Name" variant="outlined"
                  className={clsx(classes.formInput, classes.formMargin)} name="companyName"
                  value={values.companyName} onChange={handleChange} disabled={edit}
                />
              </Grid>
              <Grid item md={5} sm={12} xs={12}>
                <TextField id="outlined-basic" label="Email" variant="outlined"
                  className={clsx(classes.formInput)} name="companyEmail"
                  value={values.companyEmail} onChange={handleChange} disabled={edit}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <span style={{display: 'flex', alignItems: 'center'}}>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            className={classes.searchBtn}
            startIcon={<UpdateIcon />}
            type="submit"
            disabled={isUpdatingJob}
          >
            Update
          </Button>
          {
            isUpdatingJob &&
              <div style={{marginLeft: 50}}>
                <Loader
                  type="Oval"
                  color="#E94368"
                  height={40}
                  width={40}
                />
              </div>
          }
        </span>

      </form>
    </div>
  )
}

export default UpdateJob;
