import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import ContactActions from '../actions/ContactActions';


export default class Contact extends Component {

  constructor(props) {
    super(props);
  }

  onDestroyClick = () => {
    ContactActions.destroy(this.props.contact.email);
  }

  render() {
    const contact = this.props.contact;

    const destroyButton = this.props.isLogged ? (<button className="destroy" onClick={this.onDestroyClick} />) : '';
    return (
      <li
        key={contact.email}
      >
        <div className="contact">
          <img src={contact.picture.medium} alt="" />
          <div className="contact-info">
            <Link to={'contacts/' + contact.login.username}> {contact.name.first} {contact.name.last} </Link>

            <div>
                        {contact.email}
            </div>
            <div>
                        {contact.phone}
            </div>
          </div>
          <div className="destroy-button-wrapper">
        {destroyButton}
          </div>
        </div>
      </li>
    );
  }

}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
