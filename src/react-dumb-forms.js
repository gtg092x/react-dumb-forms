import React from 'react';
import ifErrorGenerator from './components/ifErrorGenerator';
import dumbLabelGenerator from './components/dumbLabelGenerator';
import {getPreset} from './change-presets';
import deepEqual from 'deep-equal';
import _ from 'lodash';
import dot from 'dot-object';

const ENTER_KEY = 13;

const defaults = {
  isNewModel() {
    return true;
  }
};

function getValueFromEvent(event) {
  if (event.nativeEvent !== undefined && (event.nativeEvent.value !== undefined || event.nativeEvent.text !== undefined)){
    return event.nativeEvent.text !== undefined ? event.nativeEvent.text : event.nativeEvent.value;
  } else if (event.target !== undefined) {
    return event.target.value;
  } else if (event.currentTarget !== undefined) {
    return event.currentTarget.value;
  } else if (event.value !== undefined) {
    return event.value;
  } else {
    return event;
  }
}

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
      this.onSubmitEditing = this.onSubmitEditing.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onFocus = this.onFocus.bind(this);
      this.formProps = this.formProps.bind(this);
      this.propsFor = this.propsFor.bind(this);
      this.basePropsFor = this.basePropsFor.bind(this);
      this.checkedPropsFor = this.checkedPropsFor.bind(this);
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
      return {...dot.dot(props.model)};
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

    onBlur(name, e) {
      const value = getValueFromEvent(e);
      this.props.onBlur({name, value});
      const {dirt} = this.state;
      dirt[name] = true;
      this.setState({dirt});
    }

    onChange(name, e) {
      const value = getValueFromEvent(e);
      this.props.onChange({name, value});
    }
    onChangeText(name, value) {
      this.props.onChange({name, value});
    }
    onSelect(name, value) {
      this.props.onChange({name, value});
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

    onFocus(name, e) {
      const value = getValueFromEvent(e);
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

    onKeyDown(name, event) {

      if (event.which === ENTER_KEY && event.metaKey) {
        this.onSubmit(event, name);
        event.preventDefault();
        return false;
      }
    }

    onSubmitEditing(name, e) {
      const value = getValueFromEvent(e);
      this.onSubmit(e, name);
    }

    basePropsFor(name) {
      const props = {
        onBlur: this.onBlur.bind(this, name),
        onFocus: this.onFocus.bind(this, name),
        name
      };

      return props;
    }

    checkedPropsFor(name, value) {

      const fullName = value === undefined
        ? name
        : `${name}_${value}`;

      const onChange = (e) => {
        const target = e.target || e;

        const {checked, value: targetValue} = target;
        if (value === undefined) {
          this.onChange(name, {value: checked});
        } else if (value === targetValue && checked) {
          this.onChange(name, {value});
        }
      };

      return {
        onChange,
        ...this.basePropsFor(name),
        ref: this.registerRef.bind(this, fullName),
        checked: value === undefined ? this.getValue(name) === true : value === this.getValue(name),
        id: this.getFieldId(fullName),
        value
      };
    }

    propsFor(name, onChangeHandler, onChangeHandlerFn) {
      const props = {
        ...this.basePropsFor(name, onChangeHandler, onChangeHandlerFn),
        value: this.getValue(name),
        onKeyDown: this.onKeyDown.bind(this, name),
        onSubmitEditing: this.onSubmitEditing.bind(this, name),
        ref: this.registerRef.bind(this, name),
        id: this.getFieldId(name)
      };

      let changeHandlerName = 'onChange';
      const onChangeBase = this.onChange.bind(this, name);
      let onChange = onChangeBase;

      if (onChangeHandler) {
        if (onChangeHandler.name) {
          changeHandlerName = onChangeHandler.name;
          onChange = function (...args) {
            const value = onChangeHandler.apply(this, args);
            onChangeBase({value});
          }
        } else if (_.isPlainObject(onChangeHandler)) {
          [changeHandlerName] = Object.keys(onChangeHandler);
          onChange = function (...args) {
            const value = onChangeHandler[onChangeHandlerName].apply(this, args);
            onChangeBase({value});
          }
        } else if (_.isString(onChangeHandler)) {
          if (onChangeHandlerFn !== undefined) {
            changeHandlerName = onChangeHandler;
            onChange = function (...args) {
              const value = onChangeHandlerFn.apply(this, args);
              onChangeBase({value});
            }
          } else {
            changeHandlerName = onChangeHandler;
            const fn = getPreset(changeHandlerName);
            onChange = function (...args) {
              const value = fn.apply(this, args);
              onChangeBase({value});
            }
          }

        }
      }

      props[changeHandlerName] = onChange;
      return props;
    }

    ifError(name, component) {
      const errors = this.errorFor(name);
      const dirt = this.getDirt(name);
      if (dirt && errors) {
        return component({name, errors, errorArray: this.getErrorArray(name)});
      }
    }

    labelPropsFor(...nameParts) {
      const name = nameParts.join('_');
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

      const {errorFor, getDirt, ifError, formProps, propsFor, labelPropsFor, checkedPropsFor} = this;

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

      return React.createElement(newForm,
        {
          ...propExpanders,
          ...boundComponents,
          fieldsetPropsFor,
          model, ...rest
        });
    }
  }
  return BoundForm;
}

export { connectForm };
