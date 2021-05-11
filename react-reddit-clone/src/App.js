import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import SignUpComponent from './components/SignUpComponent';
import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';
import CreatePostComponent from './components/CreatePostComponent';
import CreateSubredditComponent from './components/CreateSubredditComponent';
import SubredditListComponent from './components/SubredditListComponent';
import PostViewComponent from './components/PostViewComponent';
import UserProfileComponent from './components/UserProfileComponent';

import AuthRoute from './AuthRoute';
import SubredditViewComponent from './components/SubredditViewComponent';
import EditPostComponent from './components/EditPostComponent';

function App() {

  return (
    <div className="App">
      <Router>
        <div className="container">
          <HeaderComponent />
          <div className="container">
            <Switch>
              <Route path="/" exact component={HomeComponent}></Route>
              <Route path="/home" component={HomeComponent}></Route>
              <Route path="/login" component={LoginComponent}></Route>
              <Route path="/signup" component={SignUpComponent}></Route>

              <AuthRoute path="/create-post" component={CreatePostComponent}></AuthRoute>
              <AuthRoute path="/create-subreddit" component={CreateSubredditComponent}></AuthRoute>
              <Route path="/subreddits-list" component={SubredditListComponent}></Route>
              <Route path="/view-post/:id" component={PostViewComponent}></Route>
              <AuthRoute path="/user-profile/:username" component={UserProfileComponent}></AuthRoute>
              <Route path="/view-subreddit/:id" component={SubredditViewComponent}></Route>
              <Route path="/edit-post/:id" component={EditPostComponent}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
