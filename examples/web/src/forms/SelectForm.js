import React from 'react';
import { form, input, button } from 'react-dom';
import { connectForm } from 'react-dumb-forms';

function SelectForm({formProps, checkedPropsFor, labelPropsFor, errorFor, ifError}) {

  return (
    <form {...formProps()}>
      {errorFor('*')}

      <div className="form-group">
        <label className="radio-inline" {...labelPropsFor('favoriteColor', 'red')}>
          <input type="radio" {...checkedPropsFor('favoriteColor', 'red')} />
          Red
        </label>
        <label className="radio-inline" {...labelPropsFor('favoriteColor', 'blue')}>
          <input type="radio" {...checkedPropsFor('favoriteColor', 'blue')} />
          Blue
        </label>
      </div>


      <div className="form-group">
        <label className="checkbox-inline" {...labelPropsFor('isFlake')}>
          <input type="checkbox" {...checkedPropsFor('isFlake')} />
          I change my favorite color sometimes
        </label>
      </div>

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


export default connectForm(SelectForm, validator);
