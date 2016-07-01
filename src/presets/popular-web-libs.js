/*
 onSelect(name, value) {
 this.props.onChange({name, value});
 }
 */
import _ from 'lodash';
import {getValueFromEvent} from '../lib';


function getValueFromReactDD(arg) {

  if (_.isArray(arg)) {
    return arg.map(getValueFromReactDD);
  }

  return (arg && arg.value) || arg;
}


function ReactSelect({onChange, onBlur, onFocus, onSubmit}) {
  // your args are hooks from connect-form - use them!
  const onChangeTransformed = (e) => {
    const value = getValueFromReactDD(e);
    onChange(value);
  };
  const onBlurTransformed = (e) => {
    const value = getValueFromReactDD(e);
    onBlur(value);
  };
  const onFocusTransformed = (e) => {
    const value = getValueFromReactDD(e);
    onFocus(value);
  };

  // getting sent to element
  return {
    onChange: onChangeTransformed,
    onBlur: onBlurTransformed,
    onFocus: onFocusTransformed
  };
}

export {ReactSelect};
