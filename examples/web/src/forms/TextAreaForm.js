import React from 'react';
import { form, textarea, button } from 'react-dom';
import { connectForm } from 'react-dumb-forms';

function TextAreaForm({formProps, propsFor, labelPropsFor, errorFor, ifError}) {

  return (
    <form {...formProps()}>
      {errorFor('*')}

      <label className="form-group" {...labelPropsFor('aboutMe')}>
        First Name

        {ifError('aboutMe', function({errors}) {
          return <span className="has-error">{errors}</span>;
        })}
        <textarea className="form-control" {...propsFor('aboutMe')} />

      </label>
      <button className="btn btn-success" type="submit">Submit</button>
    </form>
  );
}

const validator = {
  getError({name, value}) {
    // replace with schema work
    if (name === 'aboutMe' && !value) {
      return `About me is required`;
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


export default connectForm(TextAreaForm, validator);
