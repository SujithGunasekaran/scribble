import React, { Suspense, lazy } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header';
// import Footer from './Components/Footer';
import './Css/root.css';

const Home = lazy(() => import('./Pages/Home'));
const Login = lazy(() => import('./Pages/Login'));
const Signup = lazy(() => import('./Pages/Signup'));


const App: React.FC = () => {
  return (
    <Router>
      <div className="body_bg">
        <Header />
        <Switch>
          <div className="body_main">
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
            </Suspense>
          </div>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App;
