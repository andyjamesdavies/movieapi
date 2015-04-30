#!/bin/bash
echo "---- [Rebuilding MovieAPI] ----"

$(boot2docker shellinit)

docker stop movieapi
docker rm movieapi

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
docker build -t go_basic $DIR/../.

docker run -d -p 8000:8080 --name movieapi go_basic

echo "---- [MovieAPI rebuilt] ----"
