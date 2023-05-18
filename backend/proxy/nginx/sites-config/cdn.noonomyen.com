server {
    listen 80 http2;
    listen [::]:80 http2;
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
    gzip_comp_level 1;
    gzip_min_length 256;
    gzip_vary on;
    gzip_proxied no-cache no-store private expired auth;

    root /server/frontend/cdn.noonomyen.com;
    autoindex off;

    location / {
        add_header Cache-Control "public, must-revalidate, max-age=3600, no-transform";
    }
}
