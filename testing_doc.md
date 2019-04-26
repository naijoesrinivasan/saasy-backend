# Automated testing for SaaSY

## Style

1. Front-end

Use modules `htmlhint` for HTML linting and `xo` for the rest. 
Will need to define rules for the same and change all files that do not conform to the rules. 

Here's a [sample .htmlhintrc](https://github.com/zulip/zulip-electron/blob/master/.htmlhintrc).

Here's a [sample .stylelintrc](https://github.com/zulip/zulip-electron/blob/master/.stylelintrc).

2. Use `xo` on backend. 

3. Set up post commit git hooks for running these tests before making commits to either repo. If tests fail, commit fails. (done by a pre-commit field in the package.json file of each repo). 

4. Configure Travis with a .yml file to run all these tests on Travis. Check if any more are required. 

5. See if unit/instrumentation/integration tests can be automated using gulp/Travis and then figure out how our test cases would work with these. Write sample scripts if possible and integrate with our automated testing. 
