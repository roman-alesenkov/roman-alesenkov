import React, { Component } from 'react';
import { Link } from 'react-router';


const Header = function () {

  return (
    <div>
      <header id="header">
        <h1>Users App</h1>
      </header>
      <ul role="nav" className="header-nav">
        <li><Link to="/" activeClassName="active" className="link">Home</Link></li>
        <li><Link to="/contacts" activeClassName="active" className="link">Contacts</Link></li>
      </ul>
    </div>
);

}

export {Header as default};
