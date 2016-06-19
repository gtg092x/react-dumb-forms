import React from 'react';
import ModelViewer from '../components/ModelViewer'
import {div, h3, span} from 'react-dom';

import classNames from 'classnames';

export default class ModelContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            model: props.model
        };
    }
    componentWillReceiveProps({model}) {
        if (model !== undefined) {
            this.setState({model});
        }
    }

    onChange({name, value}) {
        const model = {...this.state.model};
        model[name] = value;
        this.setState({model});
    }
    onBlur({name, value}) {

    }
    onSubmit(model) {
        this.setState({model});
    }
    onFocus({name, value}) {

    }

    render() {
        const {model, errors, submitted} = this.state;
        const {Form} = this.props;
        return (
            <div className="row">
                <div className="col-sm-6 container-group">
                    <h3>Form</h3>
                    <Form
                        errors={errors}
                        model={model}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                    {submitted ? (<span>submitted</span>) : null}
                </div>
                <ModelViewer className="col-sm-6 container-group" model={model} />
            </div>
        );
    }
}
