import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import SimpleForm from '../forms/SimpleForm';

export default class SimpleContainer extends React.Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            model: {firstName: 'John', lastName: 'Doe'}
        };
    }
    onFocus({name, value}) {

    }
    onBlur({name, value}) {

    }
    onChange({name, value}) {
        const model = {...this.state.model};
        model[name] = value;
        this.setState({model});
    }
    onSubmit(model) {
        this.setState({model});
        setTimeout(() => {
            this.setState({errors: {
                firstName: 'First name is already taken'
            }});
        }, 1000);
    }

    render() {

        const {model, errors} = this.state;

        return (
            <View>
                <SimpleForm
                    errors={errors}
                    model={model}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                />
                <Text>{JSON.stringify(model, null, 4)}</Text>
            </View>
        );
    }
}