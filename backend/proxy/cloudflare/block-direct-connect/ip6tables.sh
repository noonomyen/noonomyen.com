#!/usr/bin/bash

ip6tables --append INPUT --protocol tcp -m multiport --destination-ports 80,443 --jump DROP

# Cloudflare IP Ranges
# Last updated: April 8, 2021

ip6tables --append INPUT --protocol tcp --source 2400:cb00::/32 -m multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2606:4700::/32 -m multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2803:f800::/32 -m multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2405:b500::/32 -m multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2405:8100::/32 -m multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2a06:98c0::/29 -m multiport --destination-ports 80,443 --jump ACCEPT
ip6tables --append INPUT --protocol tcp --source 2c0f:f248::/32 -m multiport --destination-ports 80,443 --jump ACCEPT
