# README #

Run sanity tests against sitecues urls. For example, check whether there is 1 script with data-provider="sitecues".

## Usage ##
```
[options via environment variables] npm start
```

## Options ##

### Choose checks ###
* CHECKS: comma-separated list of check names (leave empty to run all checks in the lib/checks/ folder)
* MINSEVERITY: minimum severity before showing a url -- will show all errors and warnings for that url as long as one of them meets the severity level.
  SEVERE|MAJOR|NORMAL|MINOR|NONE (default is show everything -- NONE)
* MAXSEVERITY: maximum severity before showing a url -- will show all errors and warnings for that url as none of them exceeds the severity level
  SEVERE|MAJOR|NORMAL|MINOR|NONE (default is show everything -- NONE)

### Choose urls (use of one the following) ###
* URLS: comma-separated list of urls to test
* URLSET: all|classic or file with newline-separated list of urls to test.
  Note: 'all' means all customer sites, and 'classic' is for sites in classic mode

### Choose view type (default text) ###
* VIEW (matches the view classes in the lib/views/ folder):

    * html (friendly html)

    * csv (for import into spreadsheet)

    * json

    * text (default, best for console)

### Choose output file name (default stdout) ###
* OUTFILE