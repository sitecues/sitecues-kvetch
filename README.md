# README #

Run sanity tests against sitecues urls. For example, check whether there is 1 script with data-provider="sitecues".

## Usage ##
```
[options via environment variables] npm start
```

## Options ##

### Choose checks ###
* CHECKS: comma-separated list of check names (leave empty to run all checks in the lib/checks/ folder)
* SEVERITY: minimum severity before showing a url -- will show all errors and warnings for that url as long as one of them meets the severity level.
  SEVERE|MAJOR|NORMAL|MINOR|NONE (default is show every NONE)

### Choose urls (use of one the following) ###
* URLS: comma-separated list of urls to test
* URLFILE: newline-separated list of urls to test

### Choose view type (default text) ###
* VIEW (matches the view classes in the lib/views/ folder):

    * html (friendly html)

    * csv (for import into spreadsheet)

    * json

    * text (best for console)

### Choose output file name (default stdout) ###
* OUTFILE