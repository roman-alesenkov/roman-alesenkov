import React, { Component } from 'react';

import BaseUrl from './BaseUrl.react';
import Login from './Login.react';


const Home = function () {

  return (
    <div className="home-content-wrapper">
      <BaseUrl />
      <Login />
    </div>
  );

}

export {Home as default};