import React from 'react';
import { form, select, option, button } from 'react-dom';
import { connectForm } from 'react-dumb-forms';

function CommonComponentForm({formProps, propsFor, labelPropsFor, errorFor, ifError}) {

  return (
    <form {...formProps()}>
      {errorFor('*')}

      <label className="form-group" {...labelPropsFor('bestCaCity')}>
        Best City in California
        <select className="c-select form-control" {...propsFor('bestCaCity')}>
          <option value="LA">Los Angeles</option>
          <option value="SF">San Francisco</option>
          <option value="SD">San Diego</option>
        </select>
      </label>

      <label className="form-group" {...labelPropsFor('aboutMe')}>
        About Me

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
    // TODO
    return false;
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


export default connectForm(CommonComponentForm, validator);
