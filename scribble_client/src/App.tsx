import React, { Suspense, lazy } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './Css/root.css';

// lazy loading
const Home = lazy(() => import('./Pages/Home'));
const Login = lazy(() => import('./Pages/Login'));
const Signup = lazy(() => import('./Pages/Signup'));

const App: React.FC = () => {

  return (
    <div className="body_bg">
      <div className='body_main'>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
          </Suspense>
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(App);
