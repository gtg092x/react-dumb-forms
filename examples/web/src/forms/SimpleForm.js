import React from 'react';
import { form, input, button } from 'react-dom';
import { connectForm } from 'react-dumb-forms';


function SimpleForm({formProps, propsFor, labelPropsFor, errorFor, ifError}) {

    return (
      <form {...formProps()}>
        {errorFor('*')}

        <label className="form-group" {...labelPropsFor('firstName')}>
            First Name

            {ifError('firstName', function({errors}) {
                return <span className="has-error">{errors}</span>;
            })}
        <input className="form-control" {...propsFor('firstName')} />
        </label>
        <label className="form-group">
            Last Name
            <span className="has-error">{errorFor('lastName')}</span>
            <input className="form-control" {...propsFor('lastName')} />
        </label>
        <button className="btn btn-success" type="submit">Submit</button>
      </form>
    );
}

const NameSchema = {
    type: 'object',
    properties: {
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 0 }
    }
};




export default connectForm(SimpleForm, {schema: NameSchema});
