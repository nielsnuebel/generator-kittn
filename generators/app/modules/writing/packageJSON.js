// ===========================
// Package.json Partials
// ===========================
const sortPackageJson = require('sort-package-json')

const addBaseSettings = require('../package/info/base.js')
const addAuthorData = require('../package/info/author.js')

// Dependencies
const addBaseDependencies = require('../package/dependencies/base.js')
const addStyleDependencies = require('../package/dependencies/style.js')
const addScriptDependencies = require('../package/dependencies/script.js')
const addToolsDependencies = require('../package/dependencies/tools.js')
const addStarterpackDependencies = require('../package/dependencies/starterpack.js')

const writePackageJson = () => {
  return {
    writing: (context) => {
      return new Promise((resolve) => {
        // Getting the template files
        let pkg = context.fs.readJSON(context.templatePath('package.json'), {})

        // ============================
        // Apply Data to JSON-String
        // ============================
        addBaseSettings({pkg}, context)
        addAuthorData({pkg}, context)

        addBaseDependencies({pkg}, context)
        addStyleDependencies({pkg}, context)
        addScriptDependencies({pkg}, context)
        addToolsDependencies({pkg}, context)
        addStarterpackDependencies({pkg}, context)

        // Sort package.json data
        pkg = sortPackageJson(pkg)

        // Write package.json
        context.fs.writeJSON(context.destinationPath('package.json'), pkg)

        resolve()
      })
    }
  }
}

module.exports = writePackageJson
