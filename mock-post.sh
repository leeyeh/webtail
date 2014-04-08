content=""
start=`date +%s`
timestop=$start

sh mock-log.sh  | while read line
do
    content=$content$line"\r\n"
    now=`date +%s`
    if (($now > $timestop+3)); then
        timestop=$now
        curl -d "$content" http://localhost:3000/testlog/
    fi
done
