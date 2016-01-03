/**
 * Publish
 * @description Publish all Files in distribution
 * Add a new Versionnumber to Package and Bower
 * Compress Files
 */

import gulp from 'gulp'
import runSequence from 'run-sequence'

// Overwrite the Changed Check
global.changedOverride = true

const publishTask = (cb) => {

  runSequence(
    [
      'version:bump',
    ],
    [
      'styleguide:generate'
    ],
    [
      'minify:js',
      'minify:contentimages',
      'minify:inlineimages',
      'minify:css'
    ],
    [
      'header:add'
    ],
    [
      'optimize:criticalCss'
    ],
    cb)
}

gulp.task('publish', publishTask)
module.exports = publishTask