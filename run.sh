#!/bin/sh
#
#Run each router and write results
#I'll use wrk instead of apache bench

Routers=('i40' 'http-hash' 'barista' 'express' 'choreographer' 'clutch' 'connect' 'escort' 'journey' 'regex' 'light-router' 'rawhttp')
First_route="http://127.0.0.1:2048/product/foo"
Last_route="http://127.0.0.1:2048/twenty/bar"
Green='\033[0;32m'
Red='\033[0;31m'
NC='\033[0m' # No Color

ulimit -n 9999

for file in "${Routers[@]}"
do
    echo "Starting $file.js"
    node $file.js &
    server_pid=$!
    echo "Server started with pid $server_pid"
    sleep 1 #Give some time to the server to listen
    curl -s $First_route | grep --quiet "Got product id foo" || echo "${Red}WARNING! Route 'product' did not match"  `curl -s $First_route`
    curl -s $Last_route | grep --quiet "Got twenty id bar" || echo "${Red}WARNING! Route 'twenty' did not match: " `curl -s $Last_route`
    echo "${NC}"
    echo "Running benchmark to $First_route"
    wrk $First_route > ./results/$file.txt
    echo "Running benchmark to $Last_route"
    wrk $Last_route >> ./results/$file.txt
    echo "Killing $file"
    kill $server_pid
    echo "${Green}Results for $file"
    echo $(grep 'Requests/sec' ./results/$file.txt)
    echo "${NC}"
    echo "Starting next test in 5 seconds"
    sleep 5 #5 seconds cool down
done
