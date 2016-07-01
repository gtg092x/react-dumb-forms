import _ from 'lodash';

function getValueFromEvent(event) {

  if (_.isArray(event)) {
    return event.map(getValueFromEvent);
  }
  if (event && event.nativeEvent !== undefined && (event.nativeEvent.value !== undefined || event.nativeEvent.text !== undefined)){
    return event.nativeEvent.text !== undefined ? event.nativeEvent.text : event.nativeEvent.value;
  } else if (event && event.target !== undefined) {
    return event.target.value;
  } else if (event && event.currentTarget !== undefined) {
    return event.currentTarget.value;
  } else if (event && event.value !== undefined) {
    return event.value;
  } else {
    return event;
  }
}

function genId() {
  return `form_${Math.ceil(Math.random() * 1000000)}`;
}

function unpackOnValue(onArg) {
  if (onArg.on) {
    return onArg;
  }
  const [on] = Object.keys(on);
  const off = on[on];
  return {on, off};
}

function unpackNameArgObject(nameArg) {
  const [name] = Object.keys(nameArg);
  const on = nameArg[name];

  if (_.isPlainObject(on)) {
    return {
      key: name,
      ...unpackOnValue(on)
    };
  }

  return {
    on,
    off: false,
    key: name
  };
}

function unpackNameArgArray(nameArg) {
  const [name, on, off] = nameArg;

  if (_.isPlainObject(on)) {
    return {
      key: name,
      ...unpackOnValue(on)
    };
  }

  return {
    on,
    off,
    key: name
  };
}

function unpackNameArg(nameArg) {

  if (_.isArray(nameArg)) {
    return unpackNameArgArray(nameArg);
  }
  return unpackNameArgObject(nameArg);

}

export {getValueFromEvent, genId, unpackNameArg};
