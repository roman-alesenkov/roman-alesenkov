import React, { Component, PropTypes } from 'react';

export default class RadioInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange = (event) => {

    this.setState({
      value: event.target.value,
    });

    this.props.onChange(this.props.type, event.target.value);
  }

  render() {

    return (
        <div>
      <div className="radio">
        <label>
        <input onChange={this.onChange} type="radio" value="female" checked={this.state.value === 'female'} />
        female
        </label>
      </div>
      <div className="radio">
        <label>
        <input onChange={this.onChange} type="radio" value="male" checked={this.state.value !== 'female'} />
        male
        </label>
      </div>
    </div>
    );
  }

}
