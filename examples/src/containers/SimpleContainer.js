import React from 'react';
import ModelViewer from '../components/ModelViewer'
import SimpleForm from '../forms/SimpleForm'
import {div, h3, span} from 'react-dom';
import { connectForm } from 'react-dumb-forms'
import classNames from 'classnames';

const validator = {
    getError({name, value}) {
        // replace with schema work
        if (name === 'firstName' && !value) {
            return `First name is required`;
        }
        if (name === 'lastName' && value === 'Doe') {
            return `Last name cannot be Doe`;
        }
    },
    getErrors(model) {
        // replace with schema work
        return Object.keys(model).reduce((pointer, key) => {
            const error = this.getError({name: key, value: model[key]});
            if (error && error.length) {
                pointer[key] = error;
            }
            return pointer;
        }, {});
    }
};

const ConnectedForm = connectForm(SimpleForm, validator);

export default class SimpleContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            model: {firstName: 'John', lastName: 'Doe'}
        };
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
        setTimeout(() => {
            this.setState({errors: {
                firstName: 'First name is already taken'
            }});
        }, 1000);
    }
    onFocus({name, value}) {

    }

    render() {
        const {model, errors, submitted} = this.state;

        return (
            <div className="row">
                <div className="col-sm-8 container-group">
                    <h3>Form</h3>
                    <ConnectedForm
                        errors={errors}
                        model={model}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                    {submitted ? (<span>submitted</span>) : null}
                </div>
                <ModelViewer className="col-sm-4 container-group" model={model} />
            </div>
        );
    }
}