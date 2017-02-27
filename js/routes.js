import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.react';
import Home from './components/Home.react';
import ContactApp from './components/ContactApp.react';
import Profile from './components/Profile.react';

const routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/contacts" component={ContactApp} />
      <Route path="/contacts/:id" component={Profile} />
    </Route>
);

export default routes;
