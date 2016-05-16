import React from 'react';
import {Fieldset, Field, createValue} from 'react-forms';
import {form, input, button} from 'react-dom';

export default class Simple extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state = {
      model: {firstName: 'John', lastName: 'Doe'},
      dirt: {}
    };
  }

  onChange({name, value}) {
    const {model} = this.state;
    model[name] = value;
    const {dirt} = this.state;
    dirt[name] = false;
    this.setState({model, dirt});
  }
  onBlur({name, value}) {
    const {dirt} = this.state;
    dirt[name] = true;
    this.setState({dirt});
    const val = value;
    // remote errors need to be cleared on clean
    this.setState({errors: {
      firstName: null
    }});
    if (name === 'firstName') {
      setTimeout(() => {
        this.setState({errors: {
          firstName: `${val} is already taken`
        }});
      }, 1000);
    }
  }
  onFocus({name, value}) {

  }
  onSubmit(model) {
    const {dirt} = this.state;
    Object.keys(model).forEach(key => {
      dirt[key] = true;
    });
    this.setState({model, dirt});
    setTimeout(() => {
      this.setState({errors: {
        firstName: 'First name is already taken'
      }});
    }, 1000);
  }

  render() {
    const {model, dirt, errors, submitted} = this.state;

    return (
      <div>
        <ConnectedForm dirt={dirt} errors={errors} model={model} onChange={this.onChange} onSubmit={this.onSubmit} onFocus={this.onFocus} onBlur={this.onBlur} />
        {submitted ? (<span>submitted</span>) : null}
        <p>{JSON.stringify(model)}</p>
      </div>
    );
  }
}

class ConnectedForm extends React.Component {
  constructor(props) {
    super(props);
    this.getError = this.getError.bind(this);
    this.getErrors = this.getErrors.bind(this);
    this.getDirt = this.getDirt.bind(this);
    this.getModel = this.getModel.bind(this);
    this.getValue = this.getValue.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.formProps = this.formProps.bind(this);
    this.propsFor = this.propsFor.bind(this);
    this.errorFor = this.errorFor.bind(this);
    this.formatErrors = this.formatErrors.bind(this);
    this.DumbLabel = this.DumbLabel.bind(this);
  }
  getError({name, value}) {
    // replace with schema work
    if (name === 'firstName' && ! value) {
      return `First name is required`;
    }
  }
  getErrors(model) {
    // replace with schema work
    return Object.keys(model).reduce((pointer, key) => {
      const error = this.getError({name: key, value: model[key]});
      if (error && error.length) {
        pointer[name] = error;
      }
      return pointer;
    }, {});
  }
  getDirt(name) {
    const {dirt} = this.props;
    return dirt && dirt[name];
  }
  getModel() {
    return this.props.model;
  }
  getValue(name) {
    return this.getModel()[name];
  }
  onBlur(name, {target}) {
    const {value} = target;
    this.props.onBlur({name, value});
  }
  onChange(name, {target}) {
    const {value} = target;
    this.props.onChange({name, value});
  }
  onSubmit(e) {
    const errors = this.getErrors(this.getModel());
    if (!errors || !Object.keys(errors).length) {
      this.props.onSubmit(this.getModel());
    }
    e.preventDefault();
    return false;
  }
  onFocus(name, {target}) {
    const {value} = target;
    this.props.onFocus({name, value});
  }
  formProps() {
    return {
      onSubmit: this.onSubmit,
      type: 'post',
      action: '#'
    };
  }
  propsFor(name) {
    return {
      onBlur: this.onBlur.bind(this, name),
      onFocus: this.onFocus.bind(this, name),
      onChange: this.onChange.bind(this, name),
      name,
      value: this.getValue(name)
    }
  }
  errorFor(name) {
    if (!this.getDirt(name)) {
      return null;
    }
    const {errors} = this.props;
    let parentErrors = (errors || {})[name];
    if (!Array.isArray(parentErrors)) {
      parentErrors = [parentErrors];
    }
    let schemaErrors = this.getError({name, value:this.getValue(name)}) || [];
    if (!Array.isArray(schemaErrors)) {
      schemaErrors = [schemaErrors];
    }
    const allErrors = parentErrors.concat(schemaErrors);
    if (allErrors.length === 0) {
      return null;
    }
    return this.formatErrors({errors: allErrors});
  }
  formatErrors({errors}) {
    return (<div>{errors.join(' ')}</div>);
  }
  DumbLabel({name, ...rest}) {
     return (<label></label>);
  }
  render() {

    const {model, ...rest} = this.props;

    //formProps, propsFor, errorFor

    return (<SimpleForm DumbLabel={this.DumbLabel} formProps={this.formProps} propsFor={this.propsFor} errorFor={this.errorFor} model={model} {...rest} />);
  }
}

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {formProps, propsFor, errorFor} = this.props;

    return (
      <form {...formProps()}>
        {errorFor('firstName')}
        <input {...propsFor('firstName')} />
        <input {...propsFor('lastName')} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
