FROM alpine:latest as build

RUN apk add --no-cache \
    build-base \
    pcre-dev \
    zlib-dev \
    openssl-dev \
    git \
    mercurial \
    cmake \
    gcc \
    g++ \
    make \
    curl \
    nginx \
    brotli

WORKDIR /usr/src

# Скачать Nginx
RUN curl -O http://nginx.org/download/nginx-1.25.4.tar.gz && \
    tar -zxvf nginx-1.25.4.tar.gz

# Скачать модуль Brotli
RUN git clone --recursive https://github.com/google/ngx_brotli.git

# Собрать Nginx с модулем Brotli
WORKDIR /usr/src/nginx-1.25.4
RUN ./configure --add-module=../ngx_brotli \
    --prefix=/opt/nginx \
    --with-http_ssl_module && \
    make && make install

# Финальный образ
FROM alpine:latest

COPY --from=build /opt/nginx /opt/nginx
COPY . /opt/nginx/html
COPY nginx.conf /opt/nginx/conf/nginx.conf

EXPOSE 80
CMD ["/opt/nginx/sbin/nginx", "-g", "daemon off;"]
