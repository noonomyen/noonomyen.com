# Single server hosting

- Backend proxy : Nginx

| Host | Protocol | Backend | Note |
| --- | --- | --- | --- |
| www.noonomyen.com | - | Nginx | redirect to noonomyen.com |
| status.noonomyen.com | - | - | - |
| noonomyen.com | - | - | - |
| link.noonomyen.com | HTTP : 8002 | Rust - Actix Web | - |
| blog.noonomyen.com | - | - | - |
| cdn.noonomyen.com | - | Nginx | - |

---

## Directory structure

Last updated : 2023-05-18
```
server
├── backend
│   └── link.noonomyen.com
│       ├── list.txt
│       └── redirect_server
├── frontend
│   └── cdn.noonomyen.com
│       └── robots.txt
└── proxy
    ├── log
    │   ├── access.log
    │   └── error.log
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
