const styles = (context) => {
  return {
    files: [
      {
        src: 'src/style/style.scss',
        dest: `src/style/${context.props.projectcssfilename}.scss`
      },
      {
        src: 'src/style/_loader.scss',
        dest: 'src/style/_loader.scss'
      },
      {
        src: 'src/style/_setup.scss',
        dest: 'src/style/_setup.scss'
      },
      {
        src: 'postcss.config.js',
        dest: 'postcss.config.js'
      },
      {
        conditions: {
          projectnormalize: 'custom'
        },
        src: 'src/framework_additions/_normalize.scss',
        dest: 'src/framework/partials/_normalize.scss'
      },
      {
        conditions: {
          projectnormalize: 'regular'
        },
        src: 'src/framework_additions/_normalize-slim.scss',
        dest: 'src/framework/partials/_normalize.scss'
      },
      {
        conditions: {
          projectcssstructure: 'sassAtomic'
        },
        src: 'src/skeletons/style/_application_atomic.scss',
        dest: 'src/style/application/_application.scss'
      },
      {
        conditions: {
          projectcssstructure: 'sassITCSS'
        },
        src: 'src/skeletons/style/_application_itcss.scss',
        dest: 'src/style/application/_application.scss'
      },
      {
        conditions: {
          projectcssstructure: 'sassOwn'
        },
        src: 'src/skeletons/style/_application_own.scss',
        dest: 'src/style/application/_application.scss'
      },
      {
        conditions: {
          projectcritical: true
        },
        src: 'gulpfile_additions/optimize-criticalCss.js',
        dest: 'gulpfile/tasks/optimize-criticalCss.js'
      },
      {
        conditions: {
          projectstylelint: true
        },
        src: '_stylelintrc',
        dest: '.stylelintrc'
      },
      {
        src: '_sass-lint',
        dest: '.sass-lint'
      }
    ],
    folders: [
      {
        src: 'src/framework',
        dest: 'src/framework/'
      },
      {
        src: 'src/style/maps',
        dest: 'src/style/maps/'
      },
      {
        src: 'src/style/vendor',
        dest: 'src/style/vendor/'
      },
      {
        conditions: {
          projectcssstructure: 'sassAtomic'
        },
        src: 'src/skeletons/style/atomic',
        dest: 'src/style/application/'
      },
      {
        conditions: {
          projectcssstructure: 'sassITCSS'
        },
        src: 'src/skeletons/style/itcss',
        dest: 'src/style/application/'
      }
    ]
  }
}

module.exports = styles
