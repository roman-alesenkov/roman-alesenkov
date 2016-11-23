import React, { Component } from 'react';

import Auth from './Auth.react';


const Home = function () {

  return (
    <div className="home-content-wrapper">
      <p>
        Credentials are the following:
      </p>
      <p>
        user: <span className="credentials"> user </span>
      </p>
      <p>
        password: <span className="credentials"> user </span>
      </p>
      <Auth />
    </div>
  );

}

export {Home as default};