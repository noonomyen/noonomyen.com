```
build.ts [option]

option:
    --release -- replace src link and minify
    ts-wait -- wait tsc before run tailwindcss
```

### Test
```
npm run build && sudo docker build . -t error-page && sudo docker run -it -p 80:80/tcp error-page
```

```
/status-[id]
```

---

### Release
```
npm run build.release
```
