import _ from 'lodash';

const presets = {
  onChangeText: _.identity,
  onSelect: _.identity
};

function getPreset(preset) {
  const presetFn = presets[preset];
  if (!presetFn) {
    console.warn(`Cannot find preset ${preset}. Defaulting to an identity function.`);
    return _.identity;
  }
  return presetFn;
}

export {getPreset};
