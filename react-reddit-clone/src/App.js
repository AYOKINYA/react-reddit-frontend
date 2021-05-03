import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import SignUpComponent from './components/SignUpComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <HeaderComponent />
          <div className="container">
            <Switch>
              <Route path="/" exact component={SignUpComponent}></Route>
              <Route path="/signup" component={SignUpComponent}></Route>
            </Switch>
          </div>
        </div>
      </Router>

    </div>
  );
}

export default App;
