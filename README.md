# README #

Run sanity tests against sitecues urls.

## Usage ##
[options via environment variables] npm start

## Options ##

* Choose tests:
** TESTS: comma-separated list of test names (leave empty to run all tests)

* Choose urls (use of one the following):
** URLS: comma-separated list of urls to test
** URLFILE: newline-separated list of urls to test

* Choose view type (default text):
** VIEW:
*** html (friendly html)
*** csv (for import into spreadsheet)
*** json
*** text (best for console)

*Choose output file name (default stdout)
** OUTFILE