import { Switch, Route, useLocation } from 'react-router';
import Homepage from './pages/Homepage/Homepage.component';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import CategoriesPage from './pages/categoriespage/Categoriespage.component';
import UserDashboard from './pages/UserDashboard/UserDashboard.component';
import EmployerDashboard from './pages/EmployerDashboard/EmployerDashboard.component';
import Descriptionpage from './pages/Description/DescriptionPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage.component';
import ApplyPage from './pages/ApplyPage/ApplyPage.component';
import SearchResults from './pages/SearchResults/SearchResults.component';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { AnimatePresence } from 'framer-motion';


function App() {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route path='/userDashboard' component={UserDashboard} />
        <Route path='/dashboard' component={EmployerDashboard} />
        <Route path='/search/:searchQuery' component={SearchResults} />
        <Route path='/apply/:jobId' component={ApplyPage} />
        <Route exact path='/category/:id' component={CategoriesPage} />
        <Route exact path='/description/:id' component={Descriptionpage} />
        <Route exact path='/userProfile/:id' component={UserProfilePage} />
      </Switch>
    </AnimatePresence>
  );
}

export default App;
