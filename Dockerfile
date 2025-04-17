FROM zenithar/nginx-brotli

COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
