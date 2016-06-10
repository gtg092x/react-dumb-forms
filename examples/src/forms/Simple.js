import React from 'react';
import { connectForm } from 'react-dumb-forms'
import {form, input, button} from 'react-dom';


export default class Simple extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      model: {firstName: 'John', lastName: 'Doe'}
    };
  }

  onChange({name, value}) {
    const model = {...this.state.model};
    model[name] = value;
    this.setState({model});
  }
  onBlur({name, value}) {

  }
  onSubmit(model) {
    this.setState({model});
    setTimeout(() => {
      this.setState({errors: {
        firstName: 'First name is already taken'
      }});
    }, 1000);
  }
  onFocus({name, value}) {

  }

  render() {
    const {model, errors, submitted} = this.state;

    return (
      <div>
        <ConnectedForm
          errors={errors}
          model={model}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {submitted ? (<span>submitted</span>) : null}
        <p>{JSON.stringify(model)}</p>
      </div>
    );
  }
}



const SimpleForm = class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {formProps, propsFor, errorFor} = this.props;

    return (
      <form {...formProps()}>
        {errorFor('*')}
        {errorFor('firstName')}
        <input {...propsFor('firstName')} />
        {errorFor('lastName')}
        <input {...propsFor('lastName')} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const ConnectedForm = connectForm(SimpleForm, {
   getError({name, value}) {
    // replace with schema work
    if (name === 'firstName' && !value) {
      return `First name is required`;
    }
    if (name === 'lastName' && value === 'Doe') {
      return `Last name cannot be Doe`;
    }
  },
  getErrors(model) {
    // replace with schema work
    return Object.keys(model).reduce((pointer, key) => {
      const error = this.getError({name: key, value: model[key]});
      if (error && error.length) {
        pointer[key] = error;
      }
      return pointer;
    }, {});
  }
});
