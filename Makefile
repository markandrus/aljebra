# Testing

TESTER = ./node_modules/.bin/mocha
INSTANCE_TESTS = test/*/instances/*.js
NONINSTANCE_TESTS = test/*/noninstances/*.js
ALL_TESTS = $(NONINSTANCE_TESTS) $(INSTANCE_TESTS)

test:
	@make test-instances

test-instances:
	$(TESTER) -R spec $(INSTANCE_TESTS)

test-noninstances:
	$(TESTER) -R spec $(NONINSTANCE_TESTS)

test-all:
	$(TESTER) $(ALL_TESTS)

test-all-verbose:
	$(TESTER) -R spec $(ALL_TESTS)

testing:
	$(TESTER) --watch $(ALL_TESTS)
	
about-testing:
	@echo "Testing"
	@echo "  make test               # Run all instance tests"
	@echo "  make test-instances     # Run all instance tests"
	@echo "  make test-noninstances  # Run all noninstance tests"
	@echo "  make test-all           # Run all tests"
	@echo "  make test-all-verbose   # Run all tests in verbose mode"
	@echo "  make testing            # Run all tests continuosly"

.PHONY: test test-instances test-noninstances test-all test-all-verbose testing about-testing
