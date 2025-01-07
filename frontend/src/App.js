import {BrowserRouter, Routes, Route} from 'react-router-dom'


//pages and components
import LandingPage from './pages/Landing.page'
import HomePage from './pages/Home.page'
import Signup from './pages/Signup.page'
import Navbar from './components/Navbar.component'
import Profile from './pages/Profile.page'
import Login from './pages/Login.Page'
import ForgotPassword from './pages/ForgotPass.page'
import OtpVerification from './pages/OTPverification.page'
import JobPosting from './pages/JobPosting.page'
import GigPosted from './pages/PostedGigs.page'
// import EmployeeSearch from './pages/EmployeeSearch.page'
import EmployeeDetails from './pages/EmployeeDetails.page'
import GigDetails from './pages/GigDetails.page'
import MyGigDetail from './pages/MyGigDetails.page'
import SavedGigDetail from './pages/SavedGigDetails.page'
import SavedGig from './pages/SavedGig.page'
// import GigSearch from './pages/GigSearch.page'
import CombinedSearchPage from './pages/Search.page'
import ApplyPage from './pages/Apply.page'
import ApplicationDetails from './pages/ApplicationDetails.page'
import NotificationPage from './pages/Notification.page'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route
              path="/"
              element={<LandingPage/>}
            />
        <Route
              path="/login"
              element={<Login/>}
            />
      </Routes>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/home/:role/:id"
              element={<HomePage/>}
            />
            <Route
              path="/gig-post/:role/:id"
              element={<JobPosting/>}
            />
            <Route
              path="/gig-posted/:role/:id"
              element={<GigPosted/>}
            />
            
            <Route
              path="/signup"
              element={<Signup/>}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword/>}
            />
            <Route
              path="/otpverify"
              element={<OtpVerification/>}
            />
            <Route
              path="/profile/:role/:id"
              element={<Profile/>}
            />
            <Route
              path="/notifications/:role/:id"
              element={<NotificationPage/>}
            />
            <Route
              path="/search/:role/:id/details/employee/:employeeId"
              element={<EmployeeDetails/>}
            />
            <Route
              path="/saved-gigs/:role/:id/details/gig/:title"
              element={<SavedGigDetail/>}
            />
            <Route
              path="/saved-gigs/:role/:id"
              element={<SavedGig/>}
            />
            <Route
              path="/search/:role/:id/details/gig/:title"
              element={<GigDetails/>}
            />
            <Route
              path="/gig-posted/:role/:id/details/gig/:title"
              element={<MyGigDetail/>}
            />
            <Route
              path="/gig-posted/:role/:id/details/gig/:title/application/:applicationID"
              element={<ApplicationDetails/>}
            />
            <Route
              path="/search/:role/:id/gig/:title/apply/:position"
              element={<ApplyPage/>}
            />

            <Route
              path="/search/:role/:id/"
              element={<CombinedSearchPage/>}
            />
             
          
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
