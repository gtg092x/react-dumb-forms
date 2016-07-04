import React from 'react';
import { form, input, button } from 'react-dom';
import { connectForm } from 'react-dumb-forms';

import {schemas} from 'react-dumb-forms-examples-lib';

function RadioForm({formProps, propsFor, labelPropsFor, errorFor, ifError}) {

  return (
    <form {...formProps()}>
      {errorFor('*')}

      <div className="form-group">
        <span className="has-error">{errorFor('favoriteColor')}</span>
        <p style={{marginTop: 0, marginBottom: 0}}>My favorite color</p>
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
          <input type="checkbox" {...propsFor('isFlake', 'Checked')} />
          I change my favorite color sometimes
        </label>
      </div>


      <div className="form-group">
        <p style={{marginTop: '1rem', marginBottom: 0}}>Should I have just used a checkbox?</p>
        <label className="radio-inline" {...labelPropsFor('overEngineered', true)}>
          <input type="radio" {...propsFor({'overEngineered': true})} />
          Yes
        </label>
        <label className="radio-inline" {...labelPropsFor('overEngineered', false)}>
          <input type="radio" {...propsFor({'overEngineered': false})} />
          No
        </label>
      </div>

      <button className="btn btn-success" type="submit">Submit</button>
    </form>
  );
}

export default connectForm(RadioForm, {schema: schemas.RadioFormSchema});
