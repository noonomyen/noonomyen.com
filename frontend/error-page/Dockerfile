FROM ubuntu:22.04

RUN apt-get update -y \
    && apt-get upgrade -y

ENV TZ=Etc/UTC

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata \
    && ln -fs /usr/share/zoneinfo/UTC /etc/localtime

RUN apt-get upgrade -y && apt-get install -y nginx

RUN echo "#!/usr/bin/bash \n\
nginx -c /etc/nginx/nginx.conf \n\
tail -f /var/log/nginx/access.log \n" > /start.sh

COPY . /

RUN cp /default.nginx.conf /etc/nginx/sites-available/default

CMD ["bash", "/start.sh"]
