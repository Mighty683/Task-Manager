import React from 'react';
export default class TaskEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    prepareFieldObj(value) {
        return value ? value : '';
    }

    handleChange(e) {
        e.preventDefault();
        let newState = this.state;
        let value = e.target.id === "when" ? new Date(e.target.value) : e.target.value;
        this.setState({data: Object.assign(this.state.data, {[e.target.id]: value})});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.state.actions.editTask(this.state.data.id, this.state.data);
    }

    handleCancel(e) {
        e.preventDefault();
        this.state.actions.cancelTaskEdit(this.state.data.id);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} class="row form-group bg-silver ma-xxs">
                    <div class="col-6">
                        <label for="name">Name:</label>
                        <input onChange={this.handleChange} id="name" type="text" class="form-control" placeHolder={this.prepareFieldObj(this.state.data.name)}/>
                    </div>
                    <div class="col-12">
                        <label for="desc">Description:</label>
                        <input onChange={this.handleChange} id="desc" type="text" class="form-control" placeHolder={this.prepareFieldObj(this.state.data.desc)}/>
                    </div>
                    <div class="col-6">
                        <label for="where">Where:</label>
                        <input onChange={this.handleChange} id="where" type="text" class="form-control" placeHolder={this.prepareFieldObj(this.state.data.where)}/>
                    </div>
                    <div class="col-2">
                        <label for="returned">Canceled?</label>
                        <input onChange={this.handleChange} id="returned" type="checkbox" class="form-control-check ml-xs"/>
                    </div>
                    <div class="col-6">
                        <label for="when">When:</label>
                        <input onChange={this.handleChange} id="when" type="datetime-local" class="form-control" placeHolder={this.prepareFieldObj(this.state.data.when)}/>
                    </div>
                    <div class="col-12 mv-xxxs text-center">
                        <button id="submit" type="submit" class="btn btn-primary">Submit</button>
                        <button id="cancel" onClick={this.handleCancel} class="ml-xxxs bg-red black border--red btn btn-primary">Cancel Edit</button>
                    </div>
            </form>
        );
    }
}
