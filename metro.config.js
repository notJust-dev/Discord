const exclusionList = require("metro-config/src/defaults/exclusionList");

module.exports = {
  resolver: {
    blacklistRE: exclusionList([/#current-cloud-backend\/.*/]),
  },
};
