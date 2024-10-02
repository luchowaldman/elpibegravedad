ARG BUILD_ENV=cicd

FROM golang:1.23-alpine as base
WORKDIR /app

RUN apk add -U --no-cache ca-certificates git openssh-client build-base

ENV GOPROXY=https://proxy.golang.org
ENV GO111MODULE=on

COPY go.mod .
COPY go.sum .

# Local Build
FROM base AS local

RUN go mod download
RUN go get github.com/githubnemo/CompileDaemon && go install -mod=mod github.com/githubnemo/CompileDaemon

ENTRYPOINT CompileDaemon --build="go build ." --command=./server

# CICD Build
FROM base AS build-cicd

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /main

# Reduce CICD build image size by using scratch image
FROM scratch as cicd
COPY --from=build-cicd /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=build-cicd /main /main
EXPOSE 80
CMD ["/main"]

FROM ${BUILD_ENV} AS build
