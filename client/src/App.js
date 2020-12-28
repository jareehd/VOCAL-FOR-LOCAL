import './App.css';
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import { HashRouter as Router, Switch } from "react-router-dom";
import { LoginPrivateRoute } from "./Components/LoginPrivateRoute";
import { PrivateRoute } from "./Components/PrivateRoute";
import LandingPage from "./Components/LandingPage";
import Header from './Components/Header';
import MyProfile from './Components/MyProfile';
import UploadPost from "./Components/UploadPost";
import UpdateProfile from "./Components/UpdateProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <LoginPrivateRoute exact path="/" component={SignIn} />
          <LoginPrivateRoute path="/register" component={SignUp} />
          <Router>
          <Header/>
           <Switch>
           <PrivateRoute path="/landingpage" component={LandingPage} />
           <PrivateRoute path="/profile" component={MyProfile}/>
           <PrivateRoute path="/update" component={UpdateProfile}/>
           <PrivateRoute path="/upload" component={UploadPost}/>
           </Switch>
          </Router>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
