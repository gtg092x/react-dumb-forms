let DefaultErrorComponent;
let DefaultLabelComponent;

function getDefaultLabelComponent() {
  return DefaultLabelComponent;
}

function getDefaultErrorComponent() {
  return DefaultErrorComponent;
}

function setErrorComponent(component) {
  DefaultErrorComponent = component;
}

function setLabelComponent(component) {
  DefaultLabelComponent = component;
}


import dumbErrorGenerator from './dumbErrorGenerator';
import ifErrorGenerator from './ifErrorGenerator';
import dumbLabelGenerator from './dumbLabelGenerator';

export {setErrorComponent, setLabelComponent, getDefaultLabelComponent, getDefaultErrorComponent, ifErrorGenerator, dumbErrorGenerator, dumbLabelGenerator};
