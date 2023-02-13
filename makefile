install: # install
	npm ci
	
lint: # lint
	npx eslint .
	
publish: # publish
	npm publish --dry-run

test: # test
	npm test

test-coverage: # test --coverage
	npm test -- --coverage