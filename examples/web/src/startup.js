import React from 'react';
import {setValidator, setLabelComponent, setErrorComponent} from 'react-dumb-forms';
import validate from 'validate.js';

function schemaInspectorBinder(config, async) {

  const getErrors = (model) => {
    return validate(model, config, {fullMessages: false});
  };

  const getError = ({name, value, model}) => {
    const constraints = config[name];
    if (!constraints) {
      return;
    }
    return validate.single(value, config[name]);
  };

  const onBlur = (name, value) => {
    setTimeout(function(){
      //async(name, 'I dont like it');
    }, 500);

  };

  return {
    getError,
    getErrors,
    onBlur
  };

}

function LabelComponent({children, ...props}) {
  return <label {...props}>{children}</label>;
}

function ErrorComponent({errors, children, className = ``, ...props}) {
  return <span className={`has-error ${className}`} {...props}>{errors}{children}</span>;
}

function startup() {
  setValidator(schemaInspectorBinder);
  setLabelComponent(LabelComponent);
  setErrorComponent(ErrorComponent);
}

export default startup;
