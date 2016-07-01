/*
 onSelect(name, value) {
 this.props.onChange({name, value});
 }
 */
import _ from 'lodash';
import {getValueFromEvent} from '../lib';

function WebInput({onChange, onBlur, onFocus}) {
  // your args are hooks from connect-form - use them!
  const onChangeTransformed = (e) => {
    const value = getValueFromEvent(e);
    onChange(value);
  };
  const onBlurTransformed = (e) => {
    const value = getValueFromEvent(e);
    onBlur(value);
  };
  const onFocusTransformed = (e) => {
    const value = getValueFromEvent(e);
    onFocus(value);
  };

  // getting sent to element
  return {
    onChange: onChangeTransformed,
    onBlur: onBlurTransformed,
    onFocus: onFocusTransformed
  };
}


export default WebInput;

export {WebInput};
