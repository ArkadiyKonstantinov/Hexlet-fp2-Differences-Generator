install:
	npm ci
gendiff:
	node bin/gendiff.js -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx jest
coverage:
	npx jest --coverage
