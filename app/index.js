'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var KittnGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
  },

  askFor: function () {
    var done = this.async();

    // Custom Greeting
    var welcome =
      '\n ' +
      '\n    /\\___/\\       '+
      '\n    )      (       '+
      '\n   =\\     /=      .--------------------------.'+
      '\n     )   (        |   Kitty, Kitty, Kitty !  |'+
      '\n    /     \\       | ------------------------ |'+
      '\n    )     (       | Welcome to the marvelous |'+
      '\n   /       \\      |     Kittn generator!     |'+
      '\n   \\       /      |_________________________/'+
      '\n    \\__ __/'+
      '\n       ))'+
      '\n      //'+
      '\n     (('+
      '\n      \\) '+
      '\n ';
    console.log(welcome);

    // Ask something to setup the project skeleton
    var prompts = [
      {
        type: 'input',
        name: 'projectname',
        message: 'Please give your project a name (without Spaces)',
        default: 'kittn'
      },{
        type: 'input',
        name: 'projectdescription',
        message: 'Project description',
        default: 'undefinied'
      },{
        type: 'input',
        name: 'projectcssfilename',
        message: 'Filename for the CSS File (without fileending)',
        default: 'style'
      },{
        type: 'confirm',
        name: 'projectiecompatible',
        message: 'IE8 compatibility needed?',
        default: false
      },{
        type: 'confirm',
        name: 'projectjquery',
        message: 'Include new (2.1.4 => y) or Old (1.11.3 => n) jQuery Version?',
        default: true
      },{
        type: 'list',
        name: 'projectstructure',
        message: 'How do you want to compile your Structure with Jade or Twig? Otherwise you can use the Copy Task to move Files from src to your dist dir.',
        choices: [
          "Twig Template",
          "Jade Template",
          "Uncompiled"
        ]
      },{
        type: 'list',
        name: 'projectUsage',
        message: 'How do you want to use Kittn? Yeoman can integrate the Toolkit for you (setting Path etc.)',
        choices: [
          "Building HTML Prototypes",
          "Integrate in CraftCMS",
          "Integrate in Wordpress",
          "Integrate in KirbyCMS"
        ]
      },{
        type: 'input',
        name: 'projectversion',
        message: 'The Version Number',
        default: '0.0.1'
      },{
        type: 'input',
        name: 'projectauthor',
        message: 'Project Author Name or Company',
        default: 'undefinied'
      },{
        type: 'input',
        name: 'projectmail',
        message: 'Mailadress from the Author',
        default: 'undefined'
      },{
        type: 'input',
        name: 'projecturl',
        message: 'Author URL',
        default: 'http://........'
      },{
        type: 'input',
        name: 'projectrepo',
        message: 'URL to the Git-Repo',
        default: 'http://........'
      }
    ];

    // Get Data from prompts
    this.prompt(prompts, function (props) {
      this.projectname = props.projectname;
      this.projectdescription = props.projectdescription;
      this.projectversion = props.projectversion;
      this.projectauthor = props.projectauthor;
      this.projectmail = props.projectmail;
      this.projecturl = props.projecturl;
      this.projectissues = props.projectissues;
      this.projectrepo = props.projectrepo;
      this.projectcssfilename = props.projectcssfilename;
      this.projectiecompatible = props.projectiecompatible;
      this.projectjquery = props.projectjquery;
      this.projectstructure = props.projectstructure;
      this.projectUsage = props.projectUsage;
      done();
    }.bind(this));
  },

  app: function () {

    // Add the Template Vars for the Process
    var template_params = {
      projectname : this.projectname,
      projectdescription : this.projectdescription,
      projectversion : this.projectversion,
      projectauthor : this.projectauthor,
      projectmail : this.projectmail,
      projecturl : this.projecturl,
      projectissues : this.projectissues,
      projectrepo : this.projectrepo,
      projectcssfilename : this.projectcssfilename,
      projectiecompatible : this.projectiecompatible,
      projectjquery : this.projectjquery,
      projectstructure : this.projectstructure,
      projectUsage : this.projectUsage,
      pkg: this.pkg
    }

    // Move the SRC Folder
    this.directory('src/js/', 'src/js/');
    this.directory('src/style/', 'src/style/');
    this.directory('src/fonts/', 'src/fonts/');
    this.directory('src/images/', 'src/images/');
    this.directory('src/scripts/', 'src/scripts/');
    this.directory('src/.system/', 'src/.system/');
    this.directory('src/framework/', 'src/framework/');

    // As Alternative build a Uncompiled Folder - good for work on native
    // templates with PHP
    this.directory('src/structure/', 'src/structure/');

    // Add SCSS Files with the desired Filename
    this.fs.copyTpl(
      this.templatePath('_style.scss'),
      this.destinationPath('src/style/'+this.projectcssfilename+'.scss'),
      template_params
    );

    // IE8 get his own CSS File for Fallbacks
    if (this.projectiecompatible == true ) {
      this.fs.copyTpl(
        this.templatePath('_style-ie8.scss'),
        this.destinationPath('src/style/'+this.projectcssfilename+'-ie8.scss'),
        template_params
      );
    }

    // Include the Jade Working Dir
    if ( this.projectstructure == 'Jade Template' ) {
      this.directory('src/jade/', 'src/template/');

      // Add the Template Header
      this.fs.copyTpl(
        this.templatePath('_site-header.jade'),
        this.destinationPath('src/template/parts/_site-header.jade'),
        template_params
      );

      // Add the Template Footer (Script Files)
      this.fs.copyTpl(
        this.templatePath('_site-scripts.jade'),
        this.destinationPath('src/template/parts/_site-scripts.jade'),
        template_params
      );

    // Include the Twig Working Dir
    } else if ( this.projectstructure == 'Twig Template' ) {
      this.directory('src/twig/', 'src/template/');

      // Add the Template Header
      this.fs.copyTpl(
        this.templatePath('_site-header.twig'),
        this.destinationPath('src/template/parts/site-header.twig'),
        template_params
      );

      // Add the Template Footer (Script Files)
      this.fs.copyTpl(
        this.templatePath('_site-scripts.twig'),
        this.destinationPath('src/template/parts/site-scripts.twig'),
        template_params
      );
    }

    // Include some other important files
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      template_params
    );
    this.fs.copyTpl(
      this.templatePath('_config.json'),
      this.destinationPath('config.json'),
      template_params
    );
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      template_params
    );
    this.fs.copyTpl(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      template_params
    );
    this.fs.copyTpl(
      this.templatePath('_defaults.scss'),
      this.destinationPath('src/framework/_defaults.scss'),
      template_params
    );
    this.fs.copyTpl(
      this.templatePath('_readme.md'),
      this.destinationPath('readme.md'),
      template_params
    );
    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('gitignore'),
      template_params
    );
    this.fs.copyTpl(
      this.templatePath('bowerrc'),
      this.destinationPath('.bowerrc'),
      template_params
    );
    this.fs.copyTpl(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig'),
      template_params
    );
    this.fs.copyTpl(
      this.templatePath('jshintrc'),
      this.destinationPath('.jshintrc'),
      template_params
    );
    this.fs.copyTpl(
      this.templatePath('todo.md'),
      this.destinationPath('todo.md'),
      template_params
    );
  },

  install: function () {
    this.installDependencies();
  }
});

module.exports = KittnGenerator;
