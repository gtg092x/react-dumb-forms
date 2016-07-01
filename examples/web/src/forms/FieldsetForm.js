import React from 'react';
import { form, input, button } from 'react-dom';
import { connectForm } from 'react-dumb-forms';

function PhoneFieldset({propsFor, labelPropsFor, children}) {
  return (
    <fieldset>
      <legend>{children}</legend>
      <label className="form-group" {...labelPropsFor('number')}>
        Phone Number
        <input className="form-control" {...propsFor('number')} />
      </label>
      <label className="form-group" {...labelPropsFor('extension')}>
        Extension
        <input  className="form-control" {...propsFor('extension')} />
      </label>
    </fieldset>
  );
}

function AddressFieldset({propsFor, labelPropsFor, children, fieldsetPropsFor}) {
  return (
    <fieldset>
      <legend>{children}</legend>
      <label className="form-group" {...labelPropsFor('address')}>
        Address
        <input className="form-control" {...propsFor('address')} />
      </label>
      <div className="form-group">
        <label className="checkbox-inline" {...labelPropsFor('mail')}>
          <input type="checkbox" {...propsFor({'mail': Boolean})} />
          Can receive mail
        </label>
      </div>
      <div className="form-group">
        <label className="radio-inline" {...labelPropsFor('deliveryMethod', 'snail')}>
          <input type="radio" {...propsFor({'deliveryMethod': 'snail'})} />
          Snail Mail
        </label>
        <label className="radio-inline" {...labelPropsFor('deliveryMethod', 'email')}>
          <input type="radio" {...propsFor({'deliveryMethod': 'email'})} />
          Email
        </label>
      </div>
      <PhoneFieldset {...fieldsetPropsFor('phone')}>
        Phone
      </PhoneFieldset>
      <PhoneFieldset {...fieldsetPropsFor('fax')}>
        Fax
      </PhoneFieldset>
    </fieldset>
  );
}


function FieldsetForm({formProps, fieldsetPropsFor, errorFor}) {

  return (
    <form {...formProps()}>
      {errorFor('*')}

      <AddressFieldset {...fieldsetPropsFor('homeAddress')}>
        Home Address
      </AddressFieldset>
      <AddressFieldset {...fieldsetPropsFor('businessAddress')}>
        Business Address
      </AddressFieldset>
      <button className="btn btn-success" type="submit">Submit</button>
    </form>
  );
}

const validator = {
  getError({name, value}) {
    // replace with schema work
    return undefined;
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


export default connectForm(FieldsetForm, validator);
