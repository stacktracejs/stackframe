browser:
	open spec/spec-runner.html

phantom:
	/usr/bin/env DISPLAY=:1 phantomjs spec/lib/run-jasmine.js spec/spec-runner.html

build: components
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
