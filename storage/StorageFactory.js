const { storageProvider, storageConfiguration } = require('./../config/storage');

const classInstances = {};
const classMappings = {
  flatFile: require('./StorageFlatFile'),
};
let defaultProvider = storageProvider;

const getDefaultProvider = () => defaultProvider;

const setDefaultProvider = (storageName) => {
  if (Object.prototype.hasOwnProperty.call(classMappings, storageName)) {
    defaultProvider = storageName;
    return this;
  }
  throw new Error(`Storage '${storageName}' is not supported.`);
};

const getInstanceByProvider = (config, provider) => {
  if (Object.prototype.hasOwnProperty.call(classMappings, provider)) {
    if (!classInstances[provider]) {
      classInstances[provider] = new classMappings[provider](config);
    }
    return classInstances[provider];
  }
  throw new Error(`Storage '${provider}' is not supported.`);
};

const getInstance = () => getInstanceByProvider(storageConfiguration, getDefaultProvider());

module.exports = Object.freeze({
  getInstance,
  getInstanceByProvider,
  setDefaultProvider,
  getDefaultProvider,
});
