#!/bin/bash
echo "---- [Setting up MovieAPI] ----"

boot2docker start

$(boot2docker shellinit)

docker build -t go_basic .
docker run -d -p 8000:8080 --name movieapi go_basic

echo "---- [MovieAPI setup] ----"
echo ""
b2dIP=$(boot2docker ip)
echo "[ip:" $b2dIP "]"
echo ""
