import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const Dashboard = lazy(() => import('../pages/dashboard'))

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Dashboard}/>
      </Switch>
    </Suspense>
  </Router>
);


export default Routes
