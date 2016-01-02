module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'stackframe.js',
            'spec/*-spec.js'
        ],
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        //browsers: ['Firefox', 'ChromeCanary', 'Opera', 'Safari'],
        browsers: ['PhantomJS2'],
        singleRun: false
    });
};
