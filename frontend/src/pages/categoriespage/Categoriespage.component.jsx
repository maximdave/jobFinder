import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import Featured from '../../components/Featured/Featured.components';
import FeaturedLoader from '../../components/Featured/FeaturedLoader.component';
import Footer from '../../components/Footer/Footer.components';
import Navbar from '../../components/NavBar/Navbar.component'
import { useDispatch, useSelector } from 'react-redux';
import homepageStyles from '../Homepage/Homepage.styles';
import { selectJobsByCategories, selectIsGettingJobCategories, jobCategoryError, getJobByCategory } from '../../redux/jobsSlice';
import Button from '@material-ui/core/Button';
import searchStyles from '../SearchResults/SearchResults.styles';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';



const CategoriesPage = () => {
  const categoryStyles = homepageStyles();
  const classes = searchStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const jobCategory = useSelector(selectJobsByCategories)
  const isGetting = useSelector(selectIsGettingJobCategories)
  const categoryError = useSelector(jobCategoryError)

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getJobByCategory(id))
  }, [dispatch, id]);

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      transition={transit}
    >
      <Navbar />
      <div className={categoryStyles.featuredSection}>
        <h2 className={categoryStyles.featuredHeading} style={{textTransform: 'capitalize'}}>{id}</h2>

        {
          isGetting &&
          <div>
            <FeaturedLoader />
            <FeaturedLoader />
            <FeaturedLoader />
            <FeaturedLoader />
          </div>
        }
        {jobCategory && jobCategory.data.length &&
          <div>
            {jobCategory.data.map(featured => <Featured featured={featured} />)}
        </div>}
        {jobCategory && !jobCategory.data.length &&
        <div className={classes.err} style={{minHeight: '55vh'}}>
          <h2 className={classes.sorry}>We're Sorry</h2>
          <h1 className={classes.errTxt}>We couldn't find any job in this category</h1>
          <Button variant="contained" color="secondary" disableElevation className={classes.searchBtn}
            component={Link} to="/"
            >
              Back to home
            </Button>
        </div>}
        {categoryError &&
          <div className={classes.err}>
            <h1 className={classes.errTxt}>An Error ocurred</h1>
            <Button variant="contained" color="secondary" disableElevation className={classes.searchBtn}
              component={Link} to="/"
              >
                Back to home
              </Button>
          </div>
          }
      </div>

      <Footer />
    </motion.div>
  )
}

export default CategoriesPage
