server {
    listen 80;
    listen [::]:80;
    server_name wwww.noonomyen.com;

    return 301 https://noonomyen.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.noonomyen.com;

    ssl_certificate /etc/ssl/noonomyen.com/origin-certificate.pem;
    ssl_certificate_key /etc/ssl/noonomyen.com/private-key.pem;
    ssl_protocols TLSv1.3;
    ssl_prefer_server_ciphers off;

    return 301 https://noonomyen.com$request_uri;
}
