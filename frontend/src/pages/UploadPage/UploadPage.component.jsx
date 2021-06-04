import React, { useState, useCallback, useMemo } from 'react'
import uploadStyles from './upload.styles';
import {useDropzone} from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setNewUser } from '../../redux/authSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { pageTransition, transit } from '../../utils/animate';
import { motion } from 'framer-motion';



const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#2196f3'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const UploadPage = () => {
  const classes = uploadStyles();
  const [resume, setResume] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isUploading, setIsUploading] = useState(false)


  const onDrop = useCallback(acceptedFiles => {
      setResume(acceptedFiles[0])
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject} = useDropzone({accept: '.doc,.docx,application/pdf', onDrop});

  const style = useMemo(() => ({
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const handleSubmit = async (e) => {
    let formData = new FormData();
    const size = resume.size / 1000;
    if (size > 70) {
      alert('file should not be more than 70kb ')
      return;
    }
    formData.append('resume', resume);
    setIsUploading(true);
    axios({
      method: "post",
      url: "https://group-e-jobfinder-api.herokuapp.com/api/v1/users/resume",
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(function (response) {
        dispatch(setNewUser(response.data));
        setIsUploading(false);
        Swal.fire({
          icon: 'success',
          title: 'Done!',
          text: 'Resume Uploaded',
          confirmButtonColor: '#E94368',
        });
      })
      .catch(function (response) {
        setIsUploading(false);
        alert('An Error ocurred !')
      });

      }

  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={pageTransition}
      transition={transit}
    >
      <div className={classes.uploadHeader}>
        <h1 className={classes.title}>Upload Resume</h1>
        {user && user.user.resume &&
        <a className={classes.myCv} href={`${user.user.resume}`} target="__blank" >My resume</a>}
      </div>
      <div {...getRootProps({className: classes.baseStyle, style})}>
        <input {...getInputProps()} />
        <CloudUploadIcon className={classes.icon} />
        <p className={classes.drag}>Drag 'n' drop resume or click here</p>
      </div>
      <aside>
        {/* <h4>Files</h4> */}
        <p className={classes.fileTxt}>{resume && resume.name}</p>
      </aside>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className={classes.searchBtn}
          onClick={handleSubmit}
          style={{marginTop: '40px'}}
          disabled={resume ? false: true}
        >
          Upload
        </Button>
      </div>
      {isUploading ? (
          <Backdrop className={classes.backdrop} open={true} style={{zIndex: 9999999}}>
            <CircularProgress className={classes.backdrop} style={{color: '#ffffff'}} />
          </Backdrop>
        ) : (
          ''
        )}
    </motion.div>
  )
}

export default UploadPage
