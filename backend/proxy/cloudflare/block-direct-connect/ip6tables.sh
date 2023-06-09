#!/usr/bin/bash

# Cloudflare IP Ranges
# Last updated: April 8, 2021

ip6tables --append INPUT --protocol tcp --source 2400:cb00::/32 --match multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2606:4700::/32 --match multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2803:f800::/32 --match multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2405:b500::/32 --match multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2405:8100::/32 --match multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2a06:98c0::/29 --match multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2c0f:f248::/32 --match multiport --destination-ports 80,443 --jump ACCEPT

ip6tables --append INPUT --protocol tcp --match multiport --destination-ports 80,443 --jump DROP
