import React from 'react';
import Dashboard from './Dashboard';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const Content = () => {
    let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={Dashboard} />
    </Switch>
  );
};

export default Content;
