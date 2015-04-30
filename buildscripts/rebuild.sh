#!/bin/bash
echo "---- [Rebuilding MovieAPI] ----"

$(boot2docker shellinit)

docker stop movieapi
docker rm movieapi

docker build -t go_basic .

docker run -d -p 8000:8080 --name movieapi go_basic

echo "---- [MovieAPI rebuilt] ----"
