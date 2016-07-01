/*
 onSubmitEditing(name, e) {
 const value = getValueFromEvent(e);
 this.onSubmit(e, name);
 }
 onChangeText(name, value) {
 this.props.onChange({name, value});
 }
 
 */

function NativeInput({onChange, onBlur, onFocus, onSubmit, name, value}) {
  // your args are hooks from connect-form - use them!
  const onBlurTransformed = () => {
    onBlur(value);
  };
  const onFocusTransformed = () => {
    onFocus(value);
  };

  // getting sent to element
  return {
    onChangeText: onChange,
    onBlur: onBlurTransformed,
    onSubmitEditing: onSubmit,
    onFocus: onFocusTransformed
  };
}

function NativeDropDown() {

}

export default NativeInput;

export {NativeInput, NativeDropDown};
