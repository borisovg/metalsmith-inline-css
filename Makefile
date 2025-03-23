all: help

## clean:    delete NPM packages and generated files
.PHONY: clean
clean:
	rm -rf node_modules
	rm -f npm-debug.log pnpm-lock.yaml
	cd example && make clean
	cd tests && make clean

## example:  build example page
.PHONY: example
example: node_modules
	cd example && make

## test:     run tests
.PHONY: test
test: node_modules
	cd tests && make

.PHONY: help
help:
	@sed -n 's/^##//p' Makefile

node_modules: package.json
	pnpm update || (rm -rf $@; exit 1)
	touch $@
