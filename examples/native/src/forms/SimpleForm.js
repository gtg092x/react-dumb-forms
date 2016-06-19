import { connectForm } from 'react-dumb-forms';

import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    } from 'react-native';

const styles = StyleSheet.create({
    page: {
        paddingBottom: 300,
    },
    default: {
        height: 26,
        borderWidth: 0.5,
        borderColor: '#0f0f0f',
        flex: 1,
        fontSize: 13,
        padding: 4,
    },
    wrapper: {

        width: 200
    }
});

function SimpleForm({formProps, propsFor, labelPropsFor, errorFor, ifError}) {

    return (
        <View style={styles.wrapper}>
            <Text>
                I'm a simple form with errors {ifError('firstName', ({errors}) => {
                return errors;
            })}
            </Text>
            <TextInput
                autoCapitalize="none"
                placeholder="First Name"
                autoCorrect={false}
                style={styles.default}
                {...propsFor('firstName')}
            />
            <TextInput
                autoCapitalize="none"
                placeholder="Last Name"
                autoCorrect={false}
                style={styles.default}
                {...propsFor('lastName')}
            />
        </View>
    );
}

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
            const error = validator.getError({name: key, value: model[key]});
            if (error && error.length) {
                pointer[key] = error;
            }
            return pointer;
        }, {});
    }
};


export default connectForm(SimpleForm, validator);
