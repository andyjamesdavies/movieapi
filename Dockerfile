FROM golang
 
ADD ./src /go/src/movieapi
RUN go install movieapi
ENTRYPOINT /go/bin/movieapi
 
EXPOSE 8080