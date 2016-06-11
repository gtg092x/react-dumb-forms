import React from 'react';
import { form, input, button } from 'react-dom';

export default class SimpleForm extends React.Component {

  render() {

    const {formProps, propsFor, labelPropsFor, errorFor, ifError} = this.props;

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
}
