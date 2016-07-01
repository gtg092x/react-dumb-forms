import {setValidator} from 'react-dumb-forms';
import inspector from 'schema-inspector';

function schemaInspectorBinder(config) {

  const getErrors = (model) => {
    const result = inspector.validate(config, model);
    if (result.valid) {
      return null;
    }
    return result.error.reduce((pointer, error) => {
      const name = error.property.replace(/^@\./, '');
      pointer[name] = pointer[name] || [];
      pointer[name].push(error.message);
      return pointer;
    }, {});
  };

  const getError = ({name, value, model}) => {
    const result = getErrors(model);
    if (!result) {
      return null;
    }
    return result[name];
  };

  return {
    getError,
    getErrors
  };

}

function startup() {
  setValidator(schemaInspectorBinder);
}

export default startup;
