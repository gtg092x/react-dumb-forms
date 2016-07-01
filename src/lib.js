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


function unpackNameArgObject(nameArg) {
  const [name] = Object.keys(nameArg);
  const on = nameArg[name];

  return {
    on,
    name
  };
}

function unpackNameArgArray(nameArg) {
  const [name, on] = nameArg;


  return {
    on,
    name
  };
}

function unpackNameArg(nameArg) {

  if (_.isArray(nameArg)) {
    return unpackNameArgArray(nameArg);
  } else if (_.isPlainObject(nameArg)) {
    return unpackNameArgObject(nameArg);
  } else {
    return {
      name: nameArg
    };
  }
}

function repackNameArg({name, on}) {
  if (on === undefined) {
    return name;
  } else {
    return {
      [name]: on
    };
  }
}

function unpackObject(obj) {
  if (_.isArray(obj)) {
    return obj;
  } else if (_.isPlainObject(obj)) {
    const [name] = Object.keys(obj);
    const val = obj[name];
    return [name, val];
  } else {
    return [obj];
  }
}

export {getValueFromEvent, genId, unpackNameArg, repackNameArg, unpackObject};
