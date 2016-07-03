#!/bin/sh
#
#Run each router and write results
#I'll use wrk instead of apache bench

Routers=('barista' 'express' 'choreographer' 'clutch' 'connect' 'escort' 'journey' 'regex' 'light-router' 'light-router-no-cache' 'rawhttp')
First_route="http://127.0.0.1:2048/products/foo"
Last_route="http://127.0.0.1:2048/twenty/foo"
Green='\033[0;32m'
NC='\033[0m' # No Color

ulimit -n 9999

for file in "${Routers[@]}"
do
    echo "Starting $file.js"
    node $file.js &
    server_pid=$!
    echo "Server started with pid $server_pid"
    sleep 1 #Give some time to the server to listen
    echo "Running benchmark to $First_route"
    wrk $First_route > ./results-2014/$file.txt
    echo "Running benchmark to $Last_route"
    wrk $Last_route >> ./results-2014/$file.txt
    echo "Killing $file"
    kill $server_pid
    echo "${Green}Results for $file"
    echo $(grep 'Requests/sec' ./results-2014/$file.txt)
    echo "${NC}"
    echo "Starting next test in 5 seconds"
    sleep 5 #5 seconds cool down
done
