all: test

## clean:  delete NPM packages and generated files
.PHONY: clean
clean:
	rm -rf \
		.nyc_output \
		../node_modules/.cache/nyc \
		coverage \
		node_modules
	rm -f npm-debug.log

## test:   run the tests (default target)
.PHONY: test
test: node_modules
	DEBUG=metalsmith-inline-css:* ./node_modules/.bin/nyc \
		--cwd ../ \
		--exclude tests/** \
		--report-dir=./tests/coverage \
		--reporter=html \
		--reporter=lcov \
		--reporter=text \
		--temp-directory ./tests/.nyc_output \
		node_modules/.bin/mocha index.spec.js

.PHONY: help
help:
	@sed -n 's/^##//p' Makefile

node_modules: package.json
	npm update || (rm -rf node_modules; exit 1)
	touch node_modules
