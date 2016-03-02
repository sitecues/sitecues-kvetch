# README #

Run sanity tests against sitecues urls. For example, check whether there is 1 script with data-provider="sitecues".

## CLI Usage ##

Prefix options with --

```
# General:
node bin/kvetch-cli [options]

# Get help:
node bin/kvetch-cli --help

# Example:
node bin/kvetch-cli --checks=badge --urls=http://eeoc.gov,acbohio.org --view=html
```

## Web server ##
Default port is 3000, but can be set via PORT environment variable.
Do NOT prefix options with --
```
# Launch server
node bin/kvetch-server
or
PORT=3123 node bin/kvetch-server

# Use web service as follows:
localhost:3000?[options]

# Example:
localhost:3000?checks=badge&urls=http://eeoc.gov,acbohio.org&view=json
```

## All options ##

### Choose checks ###
* checks: comma-separated list of check names (leave empty to run all checks in the lib/checks/ folder)
* minSeverity: minimum severity before showing a url -- will show all errors and warnings for that url as long as one of them meets the severity level.
  SEVERE|MAJOR|NORMAL|MINOR|NONE (default is show everything -- NONE)
* maxSeverity: maximum severity before showing a url -- will show all errors and warnings for that url as none of them exceeds the severity level
  SEVERE|MAJOR|NORMAL|MINOR|NONE (default is show everything -- NONE)

### Choose urls (use of one the following) ###
* urls: comma-separated list of urls to test
* urlSet: all|classic or file with newline-separated list of urls to test.
  Note: 'all' means all customer sites, and 'classic' is for sites in classic mode

### Choose view type (default text) ###
* view (matches the view classes in the lib/views/ folder):

    * html (friendly html)

    * csv (for import into spreadsheet)

    * json

    * text (default, best for console)

### View options ###
* showAll=on|off (default = off)
  Choose whether to include items in report when they have no errors

