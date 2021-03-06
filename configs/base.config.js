exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Place your global variables here
    params: {
        pagesDebugLevel: 'ERROR',
        helpersDebugLevel: 'ERROR',
        controlsDebugLevel: 'ERROR'
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine2',

    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: ['../specs/*.spec.js'],


    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        print: function () {
        } // removes jasmine dot reporter
    },

    /** ----- Fixtures ----- */
    onPrepare: function () {
        browser.driver.manage().window().maximize();

        // adds jasmine spec reporter: https://www.npmjs.com/package/jasmine-spec-reporter
        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));

        // connect Allure reporter
        var allure = require('../utils/reporter/allureReporter');
        jasmine.getEnv().addReporter(allure);
        global.allure = allure;
        jasmine.getEnv().afterEach(function(done){
            allure.takeScreenshot("after test", done);
        });
    },


    //onComplete: function() {},


    //onCleanUp: function(exitCode) {},


    //afterLaunch: function(exitCode) {},


    restartBrowserBetweenTests: false,
};