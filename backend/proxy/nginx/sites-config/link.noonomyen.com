server {
    listen 80;
    listen [::]:80;
    server_name link.noonomyen.com;

    return 301 https://$host$request_uri;
}

upstream backend_link_redirect_service {
    # server 127.0.0.1:8002;
    server unix:/tmp/redirect-server.sock;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name link.noonomyen.com;

    ssl_certificate /etc/ssl/noonomyen.com/origin-certificate.pem;
    ssl_certificate_key /etc/ssl/noonomyen.com/private-key.pem;
    ssl_protocols TLSv1.3;
    ssl_prefer_server_ciphers off;

    include /server/proxy/share-sites-config/error-page.conf;

    location / {
        proxy_pass http://backend_link_redirect_service;
    }
}
