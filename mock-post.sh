content=""
start=`date +%s`
timestop=$start

sh mock-log.sh | while read line
do
    content=$content$line"\r\n"
    now=`date +%s`
    if (($now > $timestop+3)); then
        timestop=$now
        curl --data-urlencode "content=$content" http://localhost:24601/testlog/
        content=""
    fi
done
