import React, { useEffect } from 'react'
import Navbar from '../../components/NavBar/Navbar.component';
import applyPageStyles from './ApplyPage.styles';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './editor.css';
import Loader from "react-loader-spinner";
import FormatShapesOutlinedIcon from '@material-ui/icons/FormatShapesOutlined';
import Footer from '../../components/Footer/Footer.components';
import Button from '@material-ui/core/Button';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { getJobById, selectIsGettingOneJob, selectIsGettingOneError, selectOneJob } from "../../redux/jobsSlice";
import { useParams, useHistory } from 'react-router-dom';
import { selectUser } from "../../redux/authSlice";
import DescriptionStyles from '../Description/Description.styles';
import { apply, selectIsApplying } from '../../redux/applySlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';



const ApplyPage = () => {
  const classes = applyPageStyles();
  const loaderStyles = DescriptionStyles()
  const [addData, setVal] = React.useState("")
  const user = useSelector(selectUser);
  const job = useSelector(selectOneJob);
  const history = useHistory()
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const isGettingJob = useSelector(selectIsGettingOneJob)
  const jobErr = useSelector(selectIsGettingOneError);
  // const application = useSelector(selectApplication)
  const isApplying = useSelector(selectIsApplying)

  // const [addedData, showData] = React.useState(0);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setVal(data)
  }

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
    if (!job) {
      dispatch(getJobById(jobId));
    }
  }, [history, dispatch, jobId, job, user])

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      title: job.title,
      name: user.user.name,
      email: user.user.email,
      coverletter: addData,
      resume: user.user.resume
    }
    // console.log(data);
    dispatch(apply({ data, jobId, token: user.token }));
    // history.push('/userDashboard')
    // if (application) {
    // }
  }

  return (
    <div>
      <Navbar />
      <div className={classes.appBox}>
        <h2 className={classes.pageTitle}>Application</h2>
        <FormatShapesOutlinedIcon className={classes.appIcon} />
      </div>
      <div style={{minHeight: '70vh'}}>
        {isGettingJob &&
          <div className={loaderStyles.loaderBox} >
            <Loader
              type="Oval"
              color="#E94368"
              height={60}
              width={60}
            />
        </div>}
        {user && job && !jobErr && <div className={classes.editor}>
          <div className={classes.JobDetail}>
            <p className={classes.title}>{job.title}</p>
            <p className={classes.title}>{user.user.name}</p>
            <p className={classes.title}>{user.user.email}</p>
            <a href={`${user.user.resume}`} target="_blank" rel="noreferrer"
            style={{textDecoration: 'none'}}
            className={classes.title}>Resume</a>
          </div>
          <div>
            <h5 className={classes.coverTitle}>Cover Letter</h5>
            <CKEditor editor={ClassicEditor} data={addData} onChange={handleChange} />
          </div>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            className={classes.sendBtn}
            startIcon={<SendOutlinedIcon />}
            type="submit"
            disabled={addData ? false : true}
            onClick={handleSubmit}
          >
            Send Application
          </Button>
        </div>}
      </div>
      {isApplying ? (
          <Backdrop className={classes.backdrop} open={true} style={{zIndex: '99999999'}}>
            <CircularProgress className={classes.backdrop} />
          </Backdrop>
        ) : (
          ''
        )}
      <Footer />
    </div>
  )
}

export default ApplyPage
