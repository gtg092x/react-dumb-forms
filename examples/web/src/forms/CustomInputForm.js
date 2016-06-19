import React from 'react';
import { form, input, button } from 'react-dom';
import { connectForm } from 'react-dumb-forms';


function MyInput ({onMyUpdate, ...rest}) {
    const onChange = (e) => {
      onMyUpdate({newValue: e.target.value});
    };
    return <input onChange={onChange} {...rest} />
}

function onMyUpdate({newValue}){
    return newValue;
}

function CustomInputForm({formProps, propsFor, labelPropsFor, errorFor, ifError}) {

    return (
      <form {...formProps()}>
        {errorFor('*')}

        <label className="form-group" {...labelPropsFor('firstName')}>
            First Name

            {ifError('firstName', function({errors}) {
                return <span className="has-error">{errors}</span>;
            })}
            <MyInput className="form-control" {...propsFor('firstName', onMyUpdate)} />

        </label>
        <button className="btn btn-success" type="submit">Submit</button>
      </form>
    );
}

const validator = {
    getError({name, value}) {
        // replace with schema work
        if (name === 'firstName' && !value) {
            return `First name is required`;
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


export default connectForm(CustomInputForm, validator);
