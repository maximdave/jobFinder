import React, { useEffect } from 'react'
import Navbar from '../../components/NavBar/Navbar.component'
import searchStyles from './SearchResults.styles';
import Footer from '../../components/Footer/Footer.components';
import Featured from '../../components/Featured/Featured.components';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { searchJobs, selectSearchResults, selectIsSearching, selectSearchError } from '../../redux/searchSlice';
import FeaturedLoader from '../../components/Featured/FeaturedLoader.component';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition, transit } from '../../utils/animate';

const SearchResults = () => {
  const classes = searchStyles();
  const { searchQuery } = useParams();
  const dispatch = useDispatch();
  const isSearching = useSelector(selectIsSearching);
  const searchResults = useSelector(selectSearchResults);
  const searchError = useSelector(selectSearchError);

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(searchJobs(searchQuery))
  }, [searchQuery, dispatch])
  return (
    <motion.div
    initial="out"
    animate="in"
    exit="out"
    variants={pageTransition}
    transition={transit}
    >
      <Navbar />
      <div className={classes.resultContainer}>
        <h1 className={classes.featuredHeading}>{searchQuery}</h1>
        {
          isSearching &&
          <div>
            <FeaturedLoader />
            <FeaturedLoader />
            <FeaturedLoader />
            <FeaturedLoader />
          </div>
        }
        {searchResults && searchResults.data.length &&
          <div>
            {searchResults.data.map(featured => <Featured featured={featured} />)}
          </div>}
        {searchResults && !searchResults.data.length &&
        <div className={classes.err}>
          <h2 className={classes.sorry}>We're Sorry</h2>
          <h1 className={classes.errTxt}>We couldn't find any job that match your search</h1>
          <Button variant="contained" color="secondary" disableElevation className={classes.searchBtn}
            component={Link} to="/"
            >
              Back to home
            </Button>
        </div>}
        {searchError &&
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

export default SearchResults
