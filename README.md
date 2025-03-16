# openapi-fetch-verify

```
$ docker compose up --build
$ docker compose exec app bash

$ npx openapi-typescript ./api/api.yml -o ./generated/api.d.ts
# npm start
```

`http://localhost:3030/test?param=400`  
paramに応じてステータスコードが返却されます。