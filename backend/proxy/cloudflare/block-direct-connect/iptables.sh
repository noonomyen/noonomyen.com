#!/usr/bin/bash

iptables --append INPUT --protocol tcp -m multiport --destination-ports 80,443 --jump DROP

# Cloudflare IP Ranges
# Last updated: April 8, 2021

iptables --append INPUT --protocol tcp --source 173.245.48.0/20 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 103.21.244.0/22 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 103.22.200.0/22 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 103.31.4.0/22 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 141.101.64.0/18 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 108.162.192.0/18 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 190.93.240.0/20 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 188.114.96.0/20 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 197.234.240.0/22 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 198.41.128.0/17 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 162.158.0.0/15 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 104.16.0.0/13 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 104.24.0.0/14 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 172.64.0.0/13 -m multiport --destination-ports 80,443 --jump ACCEPT
iptables --append INPUT --protocol tcp --source 131.0.72.0/22 -m multiport --destination-ports 80,443 --jump ACCEPT
