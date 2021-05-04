import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import SignUpComponent from './components/SignUpComponent';
import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';
import CreatePostComponent from './components/CreatePostComponent';
import CreateSubredditComponent from './components/CreateSubredditComponent';
import SubredditListComponent from './components/SubredditListComponent';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <HeaderComponent />
          <div className="container">
            <Switch>
              <Route path="/" exact component={LoginComponent}></Route>
              <Route path="/home" component={HomeComponent}></Route>
              <Route path="/login" component={LoginComponent}></Route>
              <Route path="/signup" component={SignUpComponent}></Route>
              <Route path="/create-post" component={CreatePostComponent}></Route>
              <Route path="/create-subreddit" component={CreateSubredditComponent}></Route>
              <Route path="/subreddits-list" component={SubredditListComponent}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
