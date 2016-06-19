import React from 'react';
import {form, input, button} from 'react-dom';
import {connectForm} from 'react-dumb-forms';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';


function MyInput({onMyUpdate, ...rest}) {
  const onChange = (e) => {
    onMyUpdate({newValue: e.target.value});
  };
  return <input onChange={onChange} {...rest} />
}

function onMyUpdate({newValue}) {
  return newValue;
}

function datePickerTransform({value, ...rest}) {
  return {
    selected: moment(value),
    ...rest
  };
}

const cakes = ['Chocolate', 'Vanilla', 'Coconut'].map(cake => ({value: cake, label: cake}));

function CustomInputForm({formProps, propsFor, labelPropsFor, errorFor, ifError}) {

  return (
    <form {...formProps()}>
      {errorFor('*')}

      <label className="form-group" {...labelPropsFor('firstName')}>
        First Name
        {ifError('firstName', function ({errors}) {
          return <span className="has-error">{errors}</span>;
        })}
        <MyInput className="form-control" {...propsFor('firstName', {changeTransform: onMyUpdate})} />
      </label>

      <label className="form-group" {...labelPropsFor('myBirthday')}>
        Date Picker
        <span className="form-control">
          <DatePicker className="form-control" {...propsFor('myBirthday', datePickerTransform)} />
        </span>
      </label>

      <label className="form-group" {...labelPropsFor('favoriteCake')}>
        React Select
        <Select multi={true} className="form-control" options={cakes} {...propsFor('favoriteCake')} />
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
