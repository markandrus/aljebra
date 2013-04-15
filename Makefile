# Testing

TESTER = ./node_modules/.bin/mocha -R spec
TESTS = test/*/instances/*.js

test:
	$(TESTER) $(TESTS)

test-verbose:
	$(TESTER) --reports spec $(TESTS)

testing:
	$(TESTER) --watch $(TESTS)
	
about-testing:
	@echo "Testing"
	@echo "  make test               # Run all tests in silent mode"
	@echo "  make test-verbose       # Run all tests in verbose mode"
	@echo "  make testing            # Run tests continuosly"

.PHONY: test test-verbose testing about-testing
