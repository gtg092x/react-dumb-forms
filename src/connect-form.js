import React from 'react';
import ifErrorGenerator from './components/ifErrorGenerator';
import dumbLabelGenerator from './components/dumbLabelGenerator';
import {getPreset} from './presets';
import defaults from './defaults'
import {genId, unpackNameArg} from './lib';

import deepEqual from 'deep-equal';
import _ from 'lodash';

function connectForm(newForm, ...args) {

  const options = args.reduce((pointer, arg) => {
    return {...pointer, ...arg};
  }, {});

  const {
    getError = _.noop,
    getErrors = _.noop,
    isNewModel = defaults.isNewModel,
    LabelComponent,
    ErrorComponent,
    DefaultComponent
  } = options;

  class BoundForm extends React.Component {
    constructor(props) {
      super(props);
      /* model manipulation*/
      this.getError = this.getError.bind(this);
      this.ifError = this.ifError.bind(this);
      this.getErrors = this.getErrors.bind(this);
      this.getDirt = this.getDirt.bind(this);
      this.getModel = this.getModel.bind(this);
      this.getValue = this.getValue.bind(this);
      this.errorFor = this.errorFor.bind(this);
      this.formatErrors = this.formatErrors.bind(this);
      this.getErrorArray = this.getErrorArray.bind(this);
      this.getFieldId = this.getFieldId.bind(this);
      this.registerRef = this.registerRef.bind(this);

      /* reduced events */
      this.onBlur = this.onBlur.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onFocus = this.onFocus.bind(this);

      /* prop splats */
      this.formProps = this.formProps.bind(this);
      this.propsFor = this.propsFor.bind(this);
      this.basePropsFor = this.basePropsFor.bind(this);
      this.checkedPropsFor = this.checkedPropsFor.bind(this);
      this.labelPropsFor = this.labelPropsFor.bind(this);

      /* utils */
      this.componentRequirementMissing = this.componentRequirementMissing.bind(this);

      this.errorCache = {};
      this.state = {dirt: {}, id: props.id || genId()};
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
      const value = model[name];
      if (value === undefined) {
        console.warn(`Warning, property ${name} not found in model:`, model);
      }
      return value;
    }

    basePropsFor(name) {
      const props = {
        onBlur: this.onBlur.bind(this, name),
        onFocus: this.onFocus.bind(this, name),
        name
      };

      return props;
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


    /* Core Form Methods */

    formProps() {
      return {
        onSubmit: this.onSubmit,
        id: this.state.id,
        type: 'post',
        action: '#'
      };
    }

    registerRef(name, ref) {
      const {onRef = _.noop} = this.props;
      onRef(name, ref);
    }

    onSubmit(e, source) {
      const {dirt} = this.state;
      const model = this.getModel();
      Object.keys(model).forEach(key => {
        dirt[key] = true;
      });
      this.setState({dirt});
      const errors = this.getErrors(this.getModel());
      if (!errors || !Object.keys(errors).length) {
        this.props.onSubmit(this.getModel(), source);
      }
      e.preventDefault();
      return false;
    }

    onChange(name, value) {
      this.props.onChange({name, value});
    }

    onBlur(name, value) {
      this.props.onBlur({name, value});
      const {dirt} = this.state;
      dirt[name] = true;
      this.setState({dirt});
    }
    onFocus(name, value) {
      this.props.onFocus({name, value});
    }
    onKeyDown(name, event) {

      if (event.which === ENTER_KEY && event.metaKey) {
        this.onSubmit(event, name);
        event.preventDefault();
        return false;
      }
    }
    /* End Core Form Methods */

    propsFor(name, presetArg) {

      if (_.isPlainObject(name) || _.isArray(name)) {
        const {on, off, key} = unpackNameArg(name);
        if (_.isBoolean(on) || on === null || on === Boolean) {
          return this.checkedPropsFor(key);
        }
        return this.checkedPropsFor(key, on);
      }

      const preset = _.isFunction(presetArg)
        ? presetArg
        : getPreset(presetArg);


      const value = this.getValue(name);

      const afterPreset = preset({...this.basePropsFor(name), value, onChange: this.onChange.bind(this, name)});

      return {
        ...this.basePropsFor(name),
        ...afterPreset,
        value,
        ref: this.registerRef.bind(this, name),
        id: this.getFieldId(name)
      };
    }

    checkedPropsFor(name, value) {

      const fullName = value === undefined
        ? name
        : `${name}_${value}`;

      const afterPreset = getPreset('Checked')({...this.basePropsFor(name), onChange: this.onChange.bind(this, name), value});
      if (!afterPreset.onChange) {
        console.warn(`Cannot find onChange for field ${name}. This probably won't work. Check your preset Checked.`);
      }

      return {
        ...this.basePropsFor(name),
        ...afterPreset,
        ref: this.registerRef.bind(this, fullName),
        checked: value === undefined ? this.getValue(name) === true : value === this.getValue(name),
        id: this.getFieldId(fullName),
        value
      };
    }

    ifError(name, component) {
      const errors = this.errorFor(name);
      const dirt = this.getDirt(name);
      if (dirt && errors) {
        return component({name, errors, errorArray: this.getErrorArray(name)});
      }
    }

    labelPropsFor(...nameParts) {

      let fullName;
      if (_.isPlainObject(nameParts[0])) {
        const [key] = Object.keys(nameParts[0]);
        fullName = `${key}_${nameParts[0][key]}`;
      } else {
        fullName = nameParts.join('_');
      }
      return {
        htmlFor: this.getFieldId(fullName)
      };
    }

    componentRequirementMissing(message) {
      return function() {
        throw `React Dumb Forms error: ${message}`;
      }
    }

    render() {

      const {model, ...rest} = this.props;

      const {errorFor, getDirt, ifError, formProps, propsFor, labelPropsFor, checkedPropsFor, getValue, onChange} = this;

      const IfError = DefaultComponent
        ? ifErrorGenerator({errorFor, getDirt}, {DefaultComponent})
        : this.componentRequirementMissing('You need to pass in option `DefaultComponent`');

      const DumbLabel = LabelComponent
        ? dumbLabelGenerator({errorFor, getDirt, labelPropsFor}, {LabelComponent, ErrorComponent})
        : this.componentRequirementMissing('You need to pass in option `LabelComponent` and `ErrorComponent`');

      const propExpanders = {
        errorFor,
        ifError,
        formProps,
        getValue,
        onChange,
        propsFor,
        checkedPropsFor,
        labelPropsFor
      };

      const boundComponents = {
        DumbLabel,
        IfError
      };

      const context = this;
      function fieldsetPropsFor (namespace) {
        const namespacedPropExpanders = Object.keys(propExpanders).reduce((pointer, key) => {
          return {
            [key](name, ...args) {
              return propExpanders[key].apply(context, [`${namespace}.${name}`, ...args]);
            },
            ...pointer
          };
        } , {});

        const namespacedBoundComponents = Object.keys(boundComponents).reduce((pointer, key) => {
          return {
            [key]({name, ...rest}, ...args) {
              return boundComponents[key].apply(context, [{name: `${namespace}.${name}`, ...rest}, ...args]);
            },
            ...pointer
          };
        } , {});

        return {
          ...namespacedPropExpanders,
          ...namespacedBoundComponents,
          fieldsetPropsFor(subnamespace, ...args) {
            // Turtles all the way down
            return fieldsetPropsFor.apply(context, [`${namespace}.${subnamespace}`, ...args]);
          }
        };
      }

      const events = {
        onSubmit: this.onSubmit
      };

      return React.createElement(newForm,
        {
          model,
          fieldsetPropsFor,
          ...events,
          ...propExpanders,
          ...boundComponents,
          ...rest
        });
    }
  }
  return BoundForm;
}


export default connectForm;
