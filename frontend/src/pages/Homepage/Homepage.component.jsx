import React, { useEffect } from 'react';
import Featured from '../../components/Featured/Featured.components';
import Hero from '../../components/Hero/Hero.component';
import Navbar from '../../components/NavBar/Navbar.component';
import homepageStyles from './Homepage.styles';
import ImportantDevicesOutlinedIcon from '@material-ui/icons/ImportantDevicesOutlined';
import Button from '@material-ui/core/Button';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import EmojiNatureOutlinedIcon from '@material-ui/icons/EmojiNatureOutlined';
import Footer from '../../components/Footer/Footer.components';
import { Link } from 'react-router-dom';
import FeaturedLoader from '../../components/Featured/FeaturedLoader.component';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs, selectAllJobsSlice, selectIsGettingJobsSlice } from '../../redux/jobsSlice';
import { reverseArray } from '../../utils/utilFunctions';
import { pageTransition, transit } from '../../utils/animate';
import { motion } from 'framer-motion';



const Homepage = () => {
  const classes = homepageStyles();
  const dispatch = useDispatch();
  const allJobs = useSelector(selectAllJobsSlice);
  const isGettingJobs = useSelector(selectIsGettingJobsSlice);


  useEffect(() => {
    dispatch(getAllJobs())
  }, [dispatch])

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      transition={transit}
    >
      <Navbar />
      <Hero />
      <div className={classes.featuredSection}>
        <h2 className={classes.featuredHeading}>Featured Jobs</h2>
        {isGettingJobs && !allJobs &&
          <div>
            <FeaturedLoader />
            <FeaturedLoader />
            <FeaturedLoader />
            <FeaturedLoader />
          </div>
        }
        {allJobs && allJobs.data.length &&
          <div>
            {reverseArray(allJobs.data).slice(0, 10).map(featured => <Featured featured={featured} />)}
          </div>
        }
      </div>
      <div className={classes.categories}>
        <h2 className={classes.featuredHeading}>Browse Top Categories</h2>
        <div className={classes.categoryContainer}>
          <div className={classes.categoryBox}>
            <ImportantDevicesOutlinedIcon className={classes.categoryIcon} />
            <h6 className={classes.categoryTitle}>Technology</h6>
            <p className={classes.categoryDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse commodi aut,
            </p>
            <Button
              component={Link}
              to="/category/technology"
              variant="contained"
              color="secondary"
              disableElevation
              className={classes.categoryBtn}>
              View Jobs
            </Button>
          </div>
          <div className={classes.categoryBox}>
            <MonetizationOnOutlinedIcon className={classes.categoryIcon} />
            <h6 className={classes.categoryTitle}>Finance</h6>
            <p className={classes.categoryDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse commodi aut,
            </p>
            <Button
              component={Link}
              to="/category/finance"
              variant="contained"
              color="secondary"
              disableElevation
              className={classes.categoryBtn}>
              View Jobs
            </Button>
          </div>
          <div className={classes.categoryBox}>
            <EmojiNatureOutlinedIcon className={classes.categoryIcon} />
            <h6 className={classes.categoryTitle}>Manufacturing</h6>
            <p className={classes.categoryDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse commodi aut,
            </p>
            <Button
              component={Link}
              to="/category/manufacturing"
              variant="contained"
              color="secondary"
              disableElevation
              className={classes.categoryBtn}>
              View Jobs
            </Button>
          </div>
          <div className={classes.categoryBox}>
            <EqualizerOutlinedIcon className={classes.categoryIcon} />
            <h6 className={classes.categoryTitle}>Marketing</h6>
            <p className={classes.categoryDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse commodi aut,
            </p>
            <Button
              component={Link}
              to="/category/marketing"
              variant="contained"
              color="secondary"
              disableElevation
              className={classes.categoryBtn}>
              View Jobs
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}

export default Homepage
