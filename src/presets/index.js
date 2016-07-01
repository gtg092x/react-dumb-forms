import _ from 'lodash';

import {Checked} from './checkbox';
import {WebInput} from './web';
import {ReactSelect} from './popular-web-libs';
import {NativeInput, NativeDropDown} from './native';

const presets = {
  Checked,
  WebInput,
  ReactSelect,
  NativeInput,
  NativeDropDown
};

const customPresets = {};

function getDefaultPreset() {
  if (navigator.product === 'ReactNative') {
    return NativeInput;  
  }
  return WebInput;
}

let defaultPreset = getDefaultPreset();

function getPreset(preset) {

  const allPresets = {
    ...presets,
    ...customPresets
  };

  if (preset === undefined) {
    return defaultPreset;
  }

  const presetFn = allPresets[preset];
  if (!presetFn) {
    console.warn(`Cannot find preset ${preset}. Using default preset.`);
    return defaultPreset;
  }
  return presetFn;
}

function setPreset(name, preset) {

  if (preset === undefined) {
    console.log(`Overriding default preset.`);
    defaultPreset = name;
    return;
  }

  if (presets[name]) {
    console.warn(`Overriding existing preset ${preset}. Consider using a different name.`);
  }

  customPresets[name] = preset;

}

export {getPreset, setPreset};
