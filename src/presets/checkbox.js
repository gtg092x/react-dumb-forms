function Checked({onChange, targetValue, modelValue}) {
  // your args are hooks from connect-form - use them!

  const onChangeTransformed = (e) => {
    const target = e.target || e;
    const {checked} = target;
    if (targetValue === undefined) {
      onChange(checked);
    } else if (checked) {
      onChange(targetValue);
    }
  };

  // getting sent to element
  return {
    onChange: onChangeTransformed,
    checked: targetValue === undefined ? modelValue === true : targetValue === modelValue
  };
}

export {Checked};
