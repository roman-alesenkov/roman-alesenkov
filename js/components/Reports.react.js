import React, { Component } from 'react';

import ReportsActions from '../actions/ReportsActions';
import ReportsStore from '../stores/ReportsStore';
import Report from './Report.react';

export default class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = this.getReportsState();
    }

    componentDidMount() {
        ReportsStore.addChangeListener(this.setReportsState);
        ReportsStore.fetchAll();
    }

    componentWillUnmount() {
        ReportsStore.removeChangeListener(this.setReportsState);
    }

    onDownloadClick = (reportType) => {
        ReportsActions.download(reportType);
    }

    setReportsState = () => {
        this.setState(this.getReportsState);
    }

    getReportsState = () => {

        return {
            reports: ReportsStore.getAll() || [],
        };
    }

    render() {

        let reportList = this.state.reports;
debugger
        let reports = reportList.map((report, i) => {
            return (
                <Report key={report.type} index={i} report={report} onDownloadClick={this.onDownloadClick}/>
            );
        });

        return (
            <ul>
                {reports}
            </ul>
        );
    }

}
