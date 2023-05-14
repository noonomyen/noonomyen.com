# Block direct connection
- prevent access to the server without a proxy

## add rules to iptables
```sh
sudo ./iptables.sh
sudo ./ip6tables.sh
```

## delete all rules
```sh
sudo iptables --flush
sudo ip6tables --flush
```
