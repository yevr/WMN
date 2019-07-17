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

const getInstanceByProvider = (args, storageName) => {
  if (Object.prototype.hasOwnProperty.call(classMappings, storageName)) {
    if (!classInstances[storageName]) {
      classInstances[storageName] = new classMappings[storageName](args);
    }
    return classInstances[storageName];
  }
  throw new Error(`Storage '${storageName}' is not supported.`);
};

const getInstance = () => getInstanceByProvider(storageConfiguration, getDefaultProvider());

module.exports = Object.freeze({
  getInstance,
  getInstanceByProvider,
  setDefaultProvider,
  getDefaultProvider,
});
