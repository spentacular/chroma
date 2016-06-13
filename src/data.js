var pkg = require('../package.json')

var data = {
  name: pkg.name,
  version: `v${pkg.version}`
}

module.exports = data
