BROWSERS=Firefox,ChromeCanary,Opera,Safari,PhantomJS

test: build/jshint.xml
	@NODE_ENV=test ./node_modules/karma/bin/karma start --single-run --browsers $(BROWSERS)

build/jshint.xml: build
	./node_modules/.bin/jshint --reporter checkstyle ./spec/stackframe-spec.js ./stackframe.js > build/jshint.xml

test-ci: build/jshint.xml
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@NODE_ENV=test ./node_modules/karma/bin/karma start karma.conf.ci.js --single-run && \
    	cat ./coverage/Chrome*/lcov.info | ./node_modules/coveralls/bin/coveralls.js --verbose

clean:
	rm -fr build coverage dist *.log

build:
	mkdir build

dist:
	mkdir dist
	./node_modules/.bin/uglifyjs2 stackframe.js \
	 	-o stackframe.min.js --source-map stackframe.js.map
	mv stackframe.min.js stackframe.js.map dist/

.PHONY: clean test dist

