let defaultValidator = null;

const validators = {};

function setValidator(name, validator) {
  if (validator === undefined) {
    defaultValidator = name;
  } else {
    validators[name] = validator;
  }
}

function getValidator(name) {
  if (name === undefined) {
    return defaultValidator;
  }
  return validators[name];
}

export {setValidator, getValidator};
