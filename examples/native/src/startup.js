import {setValidator} from 'react-dumb-forms';
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

function startup() {
  setValidator(schemaInspectorBinder);
}

export default startup;
