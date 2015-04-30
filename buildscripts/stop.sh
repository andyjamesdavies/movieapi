#!/bin/bash
echo "---- [stopping MovieAPI] ----"

$(boot2docker shellinit)

docker stop movieapi
docker rm movieapi

boot2docker stop

echo "---- [MovieAPI stopped] ----"