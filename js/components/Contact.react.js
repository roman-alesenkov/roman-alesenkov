import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import ContactActions from '../actions/ContactActions';
import ContactListStore from '../stores/ContactListStore';

export default class Contact extends Component {

  constructor(props) {
    super(props);
  }

  onDestroyClick = () => {
    ContactListStore.destroyById(this.props.contact.id);
  }

  render() {
    const contact = this.props.contact;
    const index = this.props.index;

    return (
      <li
        key={contact.id}
      >
        <div className="contact">
          <div className="contact-info">

            <div className="contact-index">
              {index + 1}
            </div>

            <Link to={'contacts/' + contact.id}> {contact.firstName} {contact.lastName} </Link>
          </div>

          <div className="destroy-button-wrapper">
            <button className="destroy" onClick={this.onDestroyClick} />
          </div>

        </div>
      </li>
    );
  }

}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
