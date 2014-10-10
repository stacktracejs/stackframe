module.exports = function (config) {
    // Check out https://saucelabs.com/platforms for all browser/platform combos
    var customLaunchers = {
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            platform: 'Windows 7',
            version: '37'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '32'
        },
        sl_safari_6: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.8',
            version: '6'
        },
        sl_ios_safari: {
            base: 'SauceLabs',
            browserName: 'iphone',
            platform: 'OS X 10.9',
            version: '7.1'
        },
        sl_ie_10: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '10'
        },
        sl_ie_11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11'
        },
        sl_opera_12: {
            base: 'SauceLabs',
            browserName: 'opera',
            platform: 'Windows 7',
            version: '12'
        }
    };

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'stackframe.js',
            'spec/*-spec.js'
        ],
        exclude: [],
        preprocessors: {},
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browserDisconnectTimeout : 10000,
        browserDisconnectTolerance : 1,
        browserNoActivityTimeout : 240000,
        captureTimeout : 240000,
        sauceLabs: {
            testName: 'stackframe unit tests'
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        reporters: ['dots', 'saucelabs'],
        singleRun: true
    });
};
