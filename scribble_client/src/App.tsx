import React, { Suspense, lazy } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './Css/root.css';

// lazy loading

const Header = lazy(() => import('./Components/Header'));
const Home = lazy(() => import('./Pages/Home'));
const Login = lazy(() => import('./Pages/Login'));
const Signup = lazy(() => import('./Pages/Signup'));


const App: React.FC = () => {
  return (
    <Router>
      <div className="body_bg">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <Switch>
          <div className="body_main">
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
            </Suspense>
          </div>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
