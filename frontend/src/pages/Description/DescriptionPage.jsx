import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Footer from "../../components/Footer/Footer.components";
import Navbar from "../../components/NavBar/Navbar.component";
import DescriptionStyles from './Description.styles';
import featuredStyles from "../../components/Featured/Featured.styles";
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getJobById, selectIsGettingOneJob, selectIsGettingOneError, selectOneJob } from "../../redux/jobsSlice";
import Loader from "react-loader-spinner";
import searchStyles from '../SearchResults/SearchResults.styles';
import { selectUser } from "../../redux/authSlice";



const DescriptionPage = () => {
  const classes = DescriptionStyles();
  const errStyles = searchStyles()
  const DescriptionStyle = featuredStyles();
  const user = useSelector(selectUser)
  const job = useSelector(selectOneJob)
  const isGettingOneJob = useSelector(selectIsGettingOneJob)
  const errMsg = useSelector(selectIsGettingOneError)
  const dispatch = useDispatch();
  const { id } = useParams();

  // let companyName, companyEmail, description, title, createdAt, location, salary;

  // if(job) {
  //   { companyName, companyEmail, description, title, createdAt, location, salary } = job
  // }


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getJobById(`${id}`))
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
        <div className={classes.root}>
          <div className={classes.jobBox}>
            {isGettingOneJob && !job &&
            <div className={classes.loaderBox} >
                <Loader
                  type="Oval"
                  color="#E94368"
                  height={60}
                  width={60}
                />
              </div>}
            {job && !errMsg &&
            <Grid container spacing={5}>
              <Grid item xs={12} sm={8}>
                <div className={classes.DescriptionTop}>
                  <div className={classes.descriptionText}>
                    <h2 >{job.title}</h2>
                  </div>
                  <div className={classes.descriptionText}>
                    {/* <DescriptionOutlinedIcon className={classes.descriptionIcon} /> */}
                    <p >
                    {job.description}
                    </p>
                  </div>

                  <div className={classes.descriptionText}>
                    <h3>{job.companyName}</h3>
                    <h4>{job.companyEmail}</h4>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
              <div className={classes.overview}>
                  <div className={DescriptionStyle.featureTop}>
                    <h1 className={DescriptionStyle.jobTitle}>Job Overview</h1>
                  </div>
                  <div className={classes.jobOverview}>
                  <Grid container spacing={3}>
                        <Grid item xs={6} sm={6}>
                          <p>Posted date :</p>
                          <p>Location :</p>
                          <p>Job Nature</p>
                          <p>Salary :</p>
                          <p>Application Closes :</p>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <p>12 Aug 2019</p>
                          <p>{job.location}</p>
                          <p>Full Time</p>
                          <p>&#8358;{job.salary}</p>
                          <p>12 June 2021</p>
                      </Grid>
                      {user && user.user.role === 'applicant' && <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            component={Link}
                            to={`/apply/${job._id}`} disabled={user ? false : true}
                          >
                          APPLY !!!
                        </Button>
                        <Grid xs={12} >
                          {!user && <Link className={classes.loginLink} to="/login">Log in to apply</Link>}
                        </Grid>
                      </div>}
                  </Grid>
                  </div>
              </div>
              </Grid>
            </Grid>}
            {errMsg &&
          <div className={errStyles.err}>
            <h1 className={errStyles.errTxt}>An Error ocurred</h1>
            <Button variant="contained" color="secondary" disableElevation className={errStyles.searchBtn}
              component={Link} to="/"
              >
                Back to home
              </Button>
          </div>
          }

          </div>
        </div>


      <Footer />
    </div>
  );
};

export default DescriptionPage;
