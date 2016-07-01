function Checked({onChange, onBlur, onFocus, onSubmit, value}) {
  // your args are hooks from connect-form - use them!


  const onChangeTransformed = (e) => {
    const target = e.target || e;
    const {checked, value: targetValue} = target;
    if (value === undefined) {
      onChange(checked);
    } else if (value === targetValue && checked) {
      onChange(value);
    }
  };

  // getting sent to element
  return {
    onChange: onChangeTransformed
  };
}

export {Checked};
