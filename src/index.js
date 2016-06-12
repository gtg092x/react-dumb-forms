import React from 'react';
import ifErrorGenerator from './components/ifErrorGenerator';
import dumbLabelGenerator from './components/dumbLabelGenerator';
import _ from 'lodash';
import deepEqual from 'deep-equal';

const defaults = {
  isNewModel() {
    return true;
  }
};

function connectForm(newForm, ...args) {

  const options = args.reduce((pointer, arg) => {
    return {...pointer, ...arg};
  }, {});

  const {getError = _.noop, isNewModel = defaults.isNewModel, getErrors = _.noop, LabelComponent, ErrorComponent, DefaultComponent} = options;

  class BoundForm extends React.Component {
    constructor(props) {
      super(props);
      this.getError = this.getError.bind(this);
      this.ifError = this.ifError.bind(this);
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
      this.componentRequirementMissing = this.componentRequirementMissing.bind(this);
      this.errorFor = this.errorFor.bind(this);
      this.labelPropsFor = this.labelPropsFor.bind(this);
      this.formatErrors = this.formatErrors.bind(this);
      this.getErrorArray = this.getErrorArray.bind(this);
      this.genId = this.genId.bind(this);
      this.getFieldId = this.getFieldId.bind(this);
      this.registerRef = this.registerRef.bind(this);
      this.errorCache = {};
      this.state = {dirt: {}, id: props.id || this.genId()};
    }

    genId() {
      return `form_${Math.ceil(Math.random() * 100000)}`;
    }

    getFieldId(name = '*') {
      return `${this.state.id}${name === '*' ? '_global' : name}`;
    }

    getError({name, value}) {
      const {errorCache} = this;
      return errorCache[name] || (errorCache[name] = getError({name, value}));
    }

    getErrors(model = this.getModel()) {
      return this.errorCache = getErrors(model);
    }

    getDirt(name) {
      const {dirt} = this.state;
      return dirt && dirt[name];
    }

    getModel(props = this.props) {
      return {...props.model};
    }

    componentWillReceiveProps(props) {


      const newModel = this.getModel(props);
      const oldModel = this.getModel(this.props);

      if (!deepEqual(newModel, oldModel) && isNewModel(newModel, oldModel)) {
        // some validations affect field relationships
        // need to clear errors on every model update
        this.errorCache = {};
        const {dirt} = this.state;
        Object.keys(oldModel).forEach(key => {
          if (newModel[key] !== oldModel[key]) {
            dirt[key] = false;
          }
        });
        this.setState({dirt});
      }
    }

    getValue(name, model = this.getModel()) {
      return model[name];
    }

    onBlur(name, {target}) {
      const {value} = target;
      this.props.onBlur({name, value});
      const {dirt} = this.state;
      dirt[name] = true;
      this.setState({dirt});
    }

    onChange(name, {target}) {
      const {value} = target;
      this.props.onChange({name, value});
    }

    onSubmit(e) {
      const {dirt} = this.state;
      const model = this.getModel();
      Object.keys(model).forEach(key => {
        dirt[key] = true;
      });
      this.setState({dirt});
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

    registerRef(name, ref) {

    }

    propsFor(name) {
      return {
        onBlur: this.onBlur.bind(this, name),
        onFocus: this.onFocus.bind(this, name),
        onChange: this.onChange.bind(this, name),
        name,
        ref: this.registerRef.bind(this, name),
        id: this.getFieldId(name),
        value: this.getValue(name)
      }
    }

    ifError(name, component) {
      const errors = this.errorFor(name);
      const dirt = this.getDirt(name);
      if (dirt && errors) {
        return component({name, errors, errorArray: this.getErrorArray(name)});
      }
    }

    labelPropsFor(name) {
      return {
        htmlFor: this.getFieldId(name)
      };
    }

    getErrorArray(name) {
      if (!this.getDirt(name)) {
        return null;
      }
      const {errors} = this.props;
      let parentErrors = (errors || {})[name];
      if (!Array.isArray(parentErrors)) {
        parentErrors = [parentErrors];
      }
      let schemaErrors = this.getError({name, value: this.getValue(name)}) || [];
      if (!Array.isArray(schemaErrors)) {
        schemaErrors = [schemaErrors];
      }
      const allErrors = parentErrors.concat(schemaErrors);
      if (allErrors.length === 0) {
        return null;
      }
      return allErrors;
    }

    errorFor(name) {
      const errors = this.getErrorArray(name);
      if (errors) {
        return this.formatErrors({errors});
      }
    }

    formatErrors({errors}) {
      return errors.join(' ');
    }

    componentRequirementMissing(message) {
      return function() {
        throw `React Dumb Forms error: ${message}`;
      }
    }

    render() {

      const {model, ...rest} = this.props;

      const {errorFor, getDirt, ifError, formProps, propsFor, labelPropsFor} = this;

      const IfError = DefaultComponent
          ? ifErrorGenerator({errorFor, getDirt}, {DefaultComponent})
          : this.componentRequirementMissing('You need to pass in option `DefaultComponent`');

      const DumbLabel = LabelComponent
          ? dumbLabelGenerator({errorFor, getDirt}, {LabelComponent, ErrorComponent})
          : this.componentRequirementMissing('You need to pass in option `LabelComponent` and `ErrorComponent`');

      return React.createElement(newForm,
        {
          DumbLabel,
          IfError,
          errorFor,
          ifError,
          formProps,
          propsFor,
          labelPropsFor,
          model, ...rest
        });
    }
  }
  return BoundForm;
}

export { connectForm };
