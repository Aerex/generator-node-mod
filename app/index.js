var yeoman = require('yeoman-generator');
var fs = require('fs');

// This syntax supports Node versions older than 6.

var Generator = yeoman.extend({

    constructor : function(args, opts) {
        yeoman.apply(this, arguments); //equaivalent to super()
        this.bluemix = JSON.parse(opts.bluemix || "{}");
        this.generatorOption1 = opts.generatorOption;
        console.log('Running constructor');
    },

    // underscore prefix makes this function private, and uncalled by Yo CLI
    _processAnswers : function(answers){
        console.log('Answers: ' + JSON.stringify(answers));
        this.bluemix = this.bluemix || JSON.parse(answers.bluemix || "{}");
        this.generatorOption1 = this.generatorOption || answers.generatorOption;
    },

    prompting : function() {
        console.log('Running prompt');
        var that = this;
        var prompts = [];
        if (this.generatorOption1 === undefined) {
            prompts.push({
                type: 'input',
                name : 'generatorOption',
                message : 'What is the generatorOption value?',
                default : 'Random generatorOption'
            });
        }
        return this.prompt(prompts).then(this._processAnswers.bind(this));
    },

    writing : function() {
        var _this = this;
        console.log('option ' + JSON.stringify(_this.generatorOption1));
        var packageJSON = this.fs.readJSON(this.destinationPath('app/package.json'));

        console.log("before package " + JSON.stringify(packageJSON));
        if(!packageJSON.dependencies){
            packageJSON.dependencies = {};
        } 

        function replacer(key, value){
            return value.replace("/\\/g", "");
        }

        packageJSON.dependencies.express = "^4.13.4";

        console.log("after package " + packageJSON);

        this.fs.writeJSON(this.destinationPath('app/package.json'), packageJSON);
    }
});


module.exports = Generator;
