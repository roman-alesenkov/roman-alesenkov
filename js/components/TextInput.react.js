import React, { Component, PropTypes } from 'react';

export default class TextInput extends Component {

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

    let focus = false;
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        value={this.state.value}
        autoFocus={this.props.autoFocus}
      />
    );
  }

}

TextInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
