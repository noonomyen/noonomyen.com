#!/usr/bin/bash

# Cloudflare IP Ranges
# Last updated: April 8, 2021

iptables --append INPUT --protocol tcp --source 173.245.48.0/20 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 103.21.244.0/22 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 103.22.200.0/22 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 103.31.4.0/22 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 141.101.64.0/18 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 108.162.192.0/18 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 190.93.240.0/20 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 188.114.96.0/20 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 197.234.240.0/22 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 198.41.128.0/17 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 162.158.0.0/15 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 104.16.0.0/13 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 104.24.0.0/14 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 172.64.0.0/13 --match multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 131.0.72.0/22 --match multiport --destination-ports 80,443 --jump ACCEPT

iptables --append INPUT --protocol tcp --match multiport --destination-ports 80,443 --jump DROP
