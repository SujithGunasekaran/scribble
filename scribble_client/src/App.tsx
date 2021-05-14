import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import './Css/root.css';

// lazy loading
const Header = lazy(() => import('./Components/Header'));
const Home = lazy(() => import('./Pages/Home'));
const Form = lazy(() => import('./Pages/Form'));

const App: React.FC = () => {

  return (
    <div className="body_bg">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <div className='body_main'>
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Form} />
            <Route path="/signup" exact component={Form} />
          </Suspense>
        </Switch>
      </div>
    </div>
  )
}

export default App;
