import './App.css';
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'
import { HashRouter as Router, Switch } from "react-router-dom";
import { LoginPrivateRoute } from "./Components/LoginPrivateRoute";
import { PrivateRoute } from "./Components/PrivateRoute";
import LandingPage from "./Components/LandingPage";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <LoginPrivateRoute exact path="/" component={SignIn} />
          <LoginPrivateRoute path="/register" component={SignUp} />
          <PrivateRoute path="/landingpage" component={LandingPage} />
          </Switch>
        
          </Router>
    </div>
  );
}

export default App;
