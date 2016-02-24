#We use a user agent from my machine just in case some of out customers block and or serve based on user agent.
USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:41.0) Gecko/20100101 Firefox/41.0" ;
#Change me if you want CSV or whatever.
DELIMITER="|" ;
function makeTable {
 D="${DELIMITER}"
 #Print The table headers
 echo "URI${D}STATUS${D}SITE_ID${D}SC_VERSION${D}Old config id${D}Old config script${D}Badge <img>${D}Load script errors${D}Load script deprecated"
 #Read the list file, sort, and clean up the entries.
 cat list.txt | sed -E -e 's/http:[\/]{1,5}//g'  -e 's/\/$//g' -e 's/^/http:\/\//g' | sort | while read URI ; do  
  # Get the UTF-8 content of the URI
  CONTENT=`wget -q -O - --tries=1 --timeout=10 --header='Accept-Charset: utf-8' --user-agent "${USER_AGENT}" "${URI}"` ;
  #Check for the old badge im
  IS_OLD_BADGE=$(echo "${CONTENT}" | grep -E -c '<img [^>]*id="sitecues-badge"')
  #
  SITE_ID="$(echo "${CONTENT}" | grep -oE 's-[A-Fa-f0-9]{8,8}[^A-Fa-f0-9]'| grep -oE 's-[A-Fa-f0-9]{8,8}' | uniq)" 
  if [[ -z ${SITE_ID}  ]] ; then
   #
   SCRITP_RELATIVE_URI="$(echo "${CONTENT}" | grep -o -E '<script data-provider="sitecues-config" type="text/javascript" src="[^"]*">' | awk -F '"' '{print $6}')"
   #
   if [[ -z ${SCRITP_RELATIVE_URI}  ]] ; then
    SCRITP_RELATIVE_URI="$(echo "${CONTENT}" | grep -o -E '<script data-provider="sitecues [^>]*' | sed -e 's/.*src="//g' -e 's/".*//g')";
   fi
   #
   CONTENT="$(wget -q -O - --tries=1 --timeout=10 --header='Accept-Charset: utf-8' --user-agent "${USER_AGENT}" "${URI}/${SCRITP_RELATIVE_URI}" )" ;
   SITE_ID="$(echo "${CONTENT}" | grep -oE 's-[A-Fa-f0-9]{8,8}[^A-Fa-f0-9]'| grep -oE 's-[A-Fa-f0-9]{8,8}' | uniq)";
  fi
  #
  IS_OLD_CONFIG_BY_ID=$(echo "${CONTENT}" | grep -c '<script id="sitecues-config"  type="text/javascript">')
  IS_OLD_CONFIG_BY_SCRIPT=$(echo "${CONTENT}" | grep -EA 3 '<script data-provider="sitecues-config|src="sitecues.js"' | grep -c 'var sitecues = window.sitecues || {};')
  IS_NEW_LOAD_SCRIPT=$(echo "${CONTENT}" | grep -EA 15 '<script data-provider="sitecues"' | grep -Ec 'sitecues.config.siteId;|sitecues.config.scriptUrl;')
  IS_DEPRICATED_LOAD_SCRIPT=$(echo "${CONTENT}" | grep -EA 15 '<script data-provider="sitecues"' | grep -Ec 'sitecues.config.site_id;|sitecues.config.script_url;')
  #
  if [[ -z ${SITE_ID}  ]] ; then
   STATUS="ERROR" ;
   SC_VERSION="";
  else
   STATUS="SUCCESS" ;
   SC_VERSION="$(wget -q -O - --tries=1 --timeout=10 --header='Accept-Charset: utf-8' --user-agent "${USER_AGENT}" "http://js.sitecues.com/l/s;id=${SITE_ID}/js/sitecues.js" | grep -oE '[0-9]{1,2}.[0-9]{1,2}.[0-9]{1,2}-RELEASE' | uniq )" ;
  fi
  #
  echo "${URI}${D}${STATUS}${D}${SITE_ID}${D}${SC_VERSION}${D}${IS_OLD_CONFIG_BY_ID}${D}${IS_OLD_CONFIG_BY_SCRIPT}${D}${IS_OLD_BADGE}${D}${IS_NEW_LOAD_SCRIPT}${D}${IS_DEPRICATED_LOAD_SCRIPT}"
 done
}
#RUN DAM YOU
makeTable > results.txt;