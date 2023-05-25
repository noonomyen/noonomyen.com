# Single server hosting

- Backend proxy : Nginx

| Host | Protocol | Backend | Note |
| --- | --- | --- | --- |
| www.noonomyen.com | - | Nginx | redirect to noonomyen.com |
| status.noonomyen.com | - | - | - |
| noonomyen.com | - | - | - |
| link.noonomyen.com | HTTP over Unix socket : /tmp/redirect-server.sock | Rust - Actix Web | - |
| blog.noonomyen.com | - | - | - |
| cdn.noonomyen.com | - | Nginx | - |

---

## Directory structure

Last updated : 2023-05-25
```
server
├── TEST
├── backend
│   └── link.noonomyen.com
│       ├── list.txt
│       └── redirect_server
├── frontend
│   ├── cdn.noonomyen.com
│   │   ├── error-page
│   │   │   ├── <hash>.css
│   │   │   └── <hash>.js
│   │   ├── fontawesome-free
│   │   │   └── 6.4.0
│   │   └── robots.txt
│   └── error-page
│       └── internal.error-page.html
└── proxy
    ├── conf.d
    │   ├── cloudflare_real-ip.conf
    │   └── internal.error-page.conf
    ├── log
    │   ├── access.log
    │   └── error.log
    ├── share-sites-config
    │   └── error-page.conf
    ├── sites-available
    │   ├── blog.noonomyen.com
    │   ├── cdn.noonomyen.com
    │   ├── default
    │   ├── link.noonomyen.com
    │   ├── noonomyen.com
    │   ├── status.noonomyen.com
    │   └── www.noonomyen.com
    └── sites-enabled
        ├── blog.noonomyen.com -> /server/proxy/sites-available/blog.noonomyen.com
        ├── cdn.noonomyen.com -> /server/proxy/sites-available/cdn.noonomyen.com
        ├── default -> /server/proxy/sites-available/default
        ├── link.noonomyen.com -> /server/proxy/sites-available/link.noonomyen.com
        ├── noonomyen.com -> /server/proxy/sites-available/noonomyen.com
        ├── status.noonomyen.com -> /server/proxy/sites-available/status.noonomyen.com
        └── www.noonomyen.com -> /server/proxy/sites-available/www.noonomyen.com
```

```
backend/proxy/nginx/nginx.conf -> /etc/nginx/nginx.conf
```
