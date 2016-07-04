import { connectForm } from 'react-dumb-forms';

import {schemas} from 'react-dumb-forms-examples-lib';

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
        height: 39,
        borderWidth: .5,
        borderColor: '#0f0f0f',
        flex: 1,
        lineHeight: 28,
        marginTop: 5,
        fontSize: 13,
        textAlignVertical: 'center',
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



export default connectForm(SimpleForm, {schema: schemas.SimpleFormSchema});
