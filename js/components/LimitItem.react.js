import React, { Component, PropTypes } from 'react';

export default class LimitItem extends Component {

  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.props.onLimitChange(this.props.value);
  }

  render() {

    return (
       <span onClick={this.onClick} className={this.props.className}>{this.props.value}</span>
    );
  }

}
