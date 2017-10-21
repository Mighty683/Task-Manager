import React from 'react';
export default class TaskRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        Object.assign(this.state, props);
    }

    getClass() {
        let today = new Date();
        let elClass = "row "
        if (!this.state.when) {
            return elClass + "bg-gray";
        }
        else if (this.props.when && this.props.when.getTime() < today.getTime()) {
            return elClass + "bg-red";
        } else {
            return elClass + "bg-green";
        }
    }

    prepareFieldObj(value) {
        if (value) {
            if (value instanceof Date)
            {
                return value.toUTCString();
            }
            return value;
        } else {
            return '';
        }
    }

    render() {
        return (
            <div class={this.getClass()}>
            <div class="col-2">{this.prepareFieldObj(this.state.name)}</div>
            <div class="col-5">{this.prepareFieldObj(this.state.desc)}</div>
            <div class="col-2">{this.prepareFieldObj(this.state.where)}</div>
            <div class="col-3">{this.prepareFieldObj(this.state.when)}</div>
            </div>
        );
    }
}
