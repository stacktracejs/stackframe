module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'stackframe.js',
            'spec/*-spec.js'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        customLaunchers: {
            Chrome_No_Sandbox: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        browsers: ['PhantomJS'],
        reporters: ['spec', 'saucelabs', 'coverage', 'coveralls'],
        preprocessors: {
            'error-stack-parser.js': 'coverage'
        },
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage',
            subdir: function(browser) {
                return browser.toLowerCase().split(/[ /-]/)[0];
            }
        },
        singleRun: false
    });
};
