import React from 'react';
import { form, input, button } from 'react-dom';
import { connectForm } from 'react-dumb-forms';

function RadioForm({formProps, propsFor, labelPropsFor, errorFor, ifError}) {

  return (
    <form {...formProps()}>
      {errorFor('*')}

      <div className="form-group">
        <label className="radio-inline" {...labelPropsFor('favoriteColor', 'red')}>
          <input type="radio" {...propsFor({'favoriteColor': 'red'})} />
          Red
        </label>
        <label className="radio-inline" {...labelPropsFor('favoriteColor', 'blue')}>
          <input type="radio" {...propsFor({'favoriteColor': 'blue'})} />
          Blue
        </label>
        <label className="radio-inline" {...labelPropsFor('favoriteColor', 'green')}>
          <input type="radio" {...propsFor({'favoriteColor': 'green'})} />
          Green
        </label>
      </div>


      <div className="form-group">
        <label className="checkbox-inline" {...labelPropsFor('isFlake')}>
          <input type="checkbox" {...propsFor({'isFlake': true})} />
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


export default connectForm(RadioForm, validator);
