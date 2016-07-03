#!/bin/sh
#
# Run each router and write results
# I'll use wrk instead of apache bench

First_route="http://127.0.0.1:2048/product/foo"
Last_route="http://127.0.0.1:2048/twenty/bar"
Green='\033[0;32m'
Red='\033[0;31m'
NC='\033[0m' # No Color
Duration=${DURATION:="30s"}

ulimit -n 9999

benchmark() {
    router=$(basename "$1")
    router="${router%.js}"
    echo "Starting $router"

    node $file &
    server_pid=$!
    echo "Server started with pid $server_pid"

    sleep 1 #Give some time to the server to listen

    curl -s $First_route | grep --quiet "Got product id foo" || echo "${Red}WARNING! Route 'product' did not match: " `curl -s $First_route` "${NC}"
    curl -s $Last_route | grep --quiet "Got twenty id bar" || echo "${Red}WARNING! Route 'twenty' did not match: " `curl -s $Last_route` "${NC}"

    echo "Running benchmark to $First_route"
    wrk -d $Duration $First_route > ./results/$router.txt
    echo "Running benchmark to $Last_route"
    wrk -d $Duration $Last_route >> ./results/$router.txt

    echo "Killing $router"
    kill $server_pid

    echo "${Green}Results for $router"
    echo $(grep 'Requests/sec' ./results/$router.txt)
    echo "${NC}"

    echo "Starting next test in 5 seconds"
    sleep 5 #5 seconds cool down
}

if [ ! -z "$1" ]; then
    file=./routers/$1.js

    if [ -f $file ]; then
        benchmark $file
    else
        echo "Router $file does not exist"
    fi
else
    for file in ./routers/*.js
    do
        benchmark $file
    done
fi
