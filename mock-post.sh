content=""
start=`date +%s`
timestop=$start
if (( $# > 0 )); then
    server=$1
else
    server="localhost:24601"
fi

sh mock-log.sh | while read line
do
    content=$content$line"\r\n"
    now=`date +%s`
    if (($now > $timestop+3)); then
        timestop=$now
        curl --data-urlencode "content=$content" "http://$server/testlog/"
        content=""
    fi
done
