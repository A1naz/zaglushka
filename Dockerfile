FROM nginx:alpine

RUN apk update && \
    apk add --no-cache \
    gcc \
    g++ \
    make \
    zlib-dev \
    pcre-dev \
    libressl-dev \
    git \
    bash && \
    cd /tmp && \
    git clone --recursive https://github.com/google/ngx_brotli.git && \
    cd /tmp && \
    wget http://nginx.org/download/nginx-1.23.0.tar.gz && \
    tar -zxvf nginx-1.23.0.tar.gz && \
    cd /tmp/nginx-1.23.0 && \
    ./configure --add-dynamic-module=/tmp/ngx_brotli && \
    make && \
    make install && \
    rm -rf /tmp/*

COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

EXPOSE 80
