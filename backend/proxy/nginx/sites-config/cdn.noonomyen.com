server {
    listen 80;
    listen [::]:80;
    server_name cdn.noonomyen.com;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name cdn.noonomyen.com;

    ssl_certificate /etc/ssl/noonomyen.com/origin-certificate.pem;
    ssl_certificate_key /etc/ssl/noonomyen.com/private-key.pem;
    ssl_protocols TLSv1.3;
    ssl_prefer_server_ciphers off;

    gzip on;
    gzip_static on;
    gzip_proxied any;
    gzip_comp_level 5;
    gzip_min_length 256;
    gzip_vary on;
    # https://developers.cloudflare.com/support/speed/optimization-file-size/what-will-cloudflare-compress
    gzip_types text/richtext
               text/plain
               text/css
               text/x-script
               text/x-component
               text/x-java-source
               text/x-markdown
               application/javascript
               application/x-javascript
               text/javascript
               text/js
               image/x-icon
               image/vnd.microsoft.icon
               application/x-perl
               application/x-httpd-cgi
               text/xml
               application/xml
               application/xml+rss
               application/vnd.api+json 
               application/x-protobuf 
               application/json
               multipart/bag
               multipart/mixed
               application/xhtml+xml
               font/ttf
               font/otf
               font/x-woff
               image/svg+xml
               application/vnd.ms-fontobject
               application/ttf
               application/x-ttf
               application/otf
               application/x-otf
               application/truetype
               application/opentype
               application/x-opentype
               application/font-woff
               application/eot
               application/font
               application/font-sfnt
               application/wasm
               application/javascript-binast 
               application/manifest+json 
               application/ld+json
               application/graphql+json
               application/geo+json;

    root /server/frontend/cdn.noonomyen.com;
    autoindex on;

    location / {
        add_header Cache-Control "public, max-age=604800, s-maxage=604800, no-transform, stale-while-revalidate=86400, stale-if-error=86400";
        add_header Cloudflare-CDN-Cache-Control "max-age=604800, stale-if-error=86400";
        add_header CDN-Cache-Control "max-age=604800, stale-if-error=86400";
    }

    location /error-page/ {
        add_header Cache-Control "public, max-age=86400, s-maxage=86400, no-transform, stale-while-revalidate=3600, stale-if-error=3600";
        add_header Cloudflare-CDN-Cache-Control "max-age=86400, stale-if-error=3600";
        add_header CDN-Cache-Control "max-age=86400, stale-if-error=3600";
    }
}
