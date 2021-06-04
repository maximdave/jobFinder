import { makeStyles } from "@material-ui/core/styles";
const DescriptionStyles = makeStyles((theme) => ({
 root: {
    width: '100%',
    marginTop: '30px',
    background: 'rgba(221, 221, 233, 0.301)',
    padding: '40px',
    borderRadius: '20px',
    marginBottom: '30px',
  },
  descriptionTitle: {
    color: theme.palette.primary.main,
    fontSize: '15px',
    width: '60%',
    margin:' auto',

    '@media (max-width: 945px)': {
      fontSize: '15px',
    },
  },
    overview: {
      width: '100%',
      marginTop: '10px',
      background: 'rgba(221, 221, 233, 0.301)',
      padding: '40px',
      borderRadius: '20px',
      marginBottom: '30px',
    },
   descriptionText: {
    color: theme.palette.primary.light,
    fontSize: '15px',
    width: '60%',
    margin:'0 auto',

    '@media (max-width: 945px)': {
      fontSize: '15px',
    },
  },
    submit: {
      margin: theme.spacing(3, 0, 2)
   },
   jobBox: {
     minHeight: '80vh'
   },
   loaderBox: {
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
     minHeight: '60vh'
   },
   loginLink: {
     color: theme.palette.primary.main
   }
}));

export default DescriptionStyles;
