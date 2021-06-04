import React, { useEffect } from 'react'
import applicationStyles from '../../components/UserApplications/UserApplications.styles';
import EmployerJobs from '../../components/EmployerJobs/EmployerJobs.components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/authSlice';
import { selectAuthorJobs, selectIsGettingAuthorJobs, getJobsByAuthor } from '../../redux/jobsSlice';
import Loader from "react-loader-spinner";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { pageTransition, transit } from '../../utils/animate';
import { motion } from 'framer-motion';



const AllEmployerJobs = () => {
  const containerClass = applicationStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const authorJobs = useSelector(selectAuthorJobs)
  const isGettingAuthorJobs = useSelector(selectIsGettingAuthorJobs);
  // const authorJobsError = useSelector(selectAuthorJobsErr)

  useEffect(() => {
    if (user) {
      dispatch(getJobsByAuthor({id: user.user._id, token: user.token}))
    }
  }, [dispatch, user,])

  return (
    <div style={{marginTop: 40}}>
        {
          isGettingAuthorJobs && !authorJobs &&
          <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
            transition={transit}
          style ={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh'}}>
            <div >
              <Loader
                type="Oval"
                color="#E94368"
                height={60}
                width={60}
              />
            </div>
          </motion.div>
        }
      <div >
        {
        authorJobs &&
        <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={pageTransition}
          transition={transit}
        className={containerClass.applicationContainer}>
          {authorJobs.map(job => <EmployerJobs key={job._id} job={job} />)}
        </motion.div>}
      </div>
      {
        authorJobs && !authorJobs.length &&
        <motion.div
        initial="out"
        animate="in"
        exit="out"
        variants={pageTransition}
        transition={transit}
        style ={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh'}}>
          <Button component={Link} to="/dashboard" variant="contained" disableElevation color="secondary">Add New Job</Button>
        </motion.div>
      }
    </div>
  )
}

export default AllEmployerJobs
