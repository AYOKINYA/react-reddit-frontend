import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import SignUpComponent from './components/SignUpComponent';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <HeaderComponent />
          <div className="container">
            <Switch>
              <Route path="/" exact component={LoginComponent}></Route>
              <Route path="/login" component={LoginComponent}></Route>
              <Route path="/signup" component={SignUpComponent}></Route>
            </Switch>
          </div>
        </div>
      </Router>

    </div>
  );
}

export default App;
