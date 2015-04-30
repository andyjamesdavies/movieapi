#!/bin/bash
echo "---- [Setting up MovieAPI] ----"

boot2docker start

$(boot2docker shellinit)

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
docker build -t go_basic $DIR/../.
docker run -d -p 8000:8080 --name movieapi go_basic

echo "---- [MovieAPI setup] ----"
echo ""
b2dIP=$(boot2docker ip)
echo "[ip:" $b2dIP "]"
echo ""
