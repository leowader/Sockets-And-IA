const { configurationModel } = require("../models/configurations");
const saveConfiguration = async (configuration) => {
  return await configurationModel.create(configuration);
};
const getConfigurations = async () => {
  return await configurationModel.find();
};
module.exports = { saveConfiguration,getConfigurations };
