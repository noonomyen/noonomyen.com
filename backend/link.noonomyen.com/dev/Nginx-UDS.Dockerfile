FROM ubuntu:22.04

RUN apt-get update -y \
    && apt-get upgrade -y

ENV TZ=Etc/UTC

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata \
    && ln -fs /usr/share/zoneinfo/UTC /etc/localtime

RUN apt-get upgrade -y && apt-get install -y nginx

RUN echo "server {\n\
    listen 80;\n\
    server_name _;\n\
    location / {\n\
        proxy_pass http://unix:/tmp/redirect-server.sock;\n\
    }\n\
}\n" > /etc/nginx/sites-available/default

RUN echo "#!/usr/bin/bash \n\
nginx -c /etc/nginx/nginx.conf \n\
/redirect_server uds /tmp/redirect-server.sock /list.txt & \n\
sleep 2 \n\
chgrp www-data /tmp/redirect-server.sock \n\
chmod 771 /tmp/redirect-server.sock \n\
top \n" > /start.sh

RUN echo "/home https://noonomyen.com" > /list.txt

COPY ./target/release/redirect_server /redirect_server

RUN chmod 744 /redirect_server

CMD ["bash", "/start.sh"]
