FROM ubuntu:22.04

RUN apt-get update -y \
    && apt-get upgrade -y

ENV TZ=Etc/UTC

RUN DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata \
    && ln -fs /usr/share/zoneinfo/UTC /etc/localtime

RUN apt-get upgrade -y && apt-get install -y nginx

RUN mkdir /etc/ssl \
    && mkdir /etc/ssl/noonomyen.com \
    && mkdir /source \
    && mkdir /server \
    && mkdir /server/proxy \
    && mkdir /server/proxy/log \
    && touch /server/proxy/log/access.log \
    && touch /server/proxy/log/error.log \
    && mkdir /server/proxy/sites-available \
    && mkdir /server/proxy/sites-enabled \
    && mkdir /server/proxy/conf.d \
    && mkdir /server/backend \
    && mkdir /server/frontend

COPY . /source

RUN cp /source/tmp/ssl/certificate.pem /etc/ssl/noonomyen.com/origin-certificate.pem \
    && cp /source/tmp/ssl/private-key.pem /etc/ssl/noonomyen.com/private-key.pem \
    && cp /source/nginx.conf /etc/nginx \
    && cp /source/sites-config/* /server/proxy/sites-available \
    && ln -s /server/proxy/sites-available/* /server/proxy/sites-enabled \
    && cp /source/conf.d/* /server/proxy/conf.d

WORKDIR /

RUN cp /source/dev/single-server/start.sh /start.sh

CMD ["bash", "/start.sh"]
