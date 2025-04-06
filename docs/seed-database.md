# DB Seed

```sh
pnpm add -D  tsx typescript
pnpm add csv-parser
```

- update package.json
  after scripts add

  ```json
    "prisma": {
      "seed": "tsx prisma/seed.ts"
    },
  ```

```sh
pnpm prisma db seed
```
