install: # install
	npm ci

gendiff: # gendiff
	node/gendiff.js

lint: # lint
	npx eslint .
	
publish: # publish
	npm publish --dry-run

test-coverage: # test --coverage
	npm test -- --coverage