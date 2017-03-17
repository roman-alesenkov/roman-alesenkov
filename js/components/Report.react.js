import React, { Component, PropTypes } from 'react';

export default class Report extends Component {

  constructor(props) {
    super(props);
    this.state = {
      report: this.props.report || {
        type: '',
        description: '',
        label: ''
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.report !== this.state.report) {
      this.setState({ report: nextProps.report || {} });
    }
  }

  onClick = () => {
    this.props.onDownloadClick(this.props.report.type);
  }

  render() {

    return (
        <div>
          <h2>
            <b>
              {this.props.index + 1}. {this.props.report.label}
            </b>
            &nbsp;&nbsp;&nbsp;
            <button onClick={this.onClick}>Download</button>
          </h2>

          <div>

            <div>{this.props.report.description}</div>

          </div>
        </div>
    );
  }

}
