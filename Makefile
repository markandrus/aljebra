TESTER = ./node_modules/.bin/mocha
TESTS = ./test/*/*.js ./test/*/*/*.js

test:
	$(TESTER) $(TESTS)

test-verbose:
	$(TESTER) -R spec $(TESTS)

testing:
	$(TESTER) --watch $(TESTS)

about-testing:
	@echo "Testing"
	@echo "  make test               # Run tests"
	@echo "  make test-verbose       # Run tests in verbose mode"
	@echo "  make testing            # Run all tests continuosly"

.PHONY: test test-verbose testing about-testing
